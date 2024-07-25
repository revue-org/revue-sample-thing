import KafkaProducer from '@/handler/events/KafkaProducer.js'
import { MEDIA_SERVER_HOST, MEDIA_SERVER_RTSP_PORT, THING_ID, thingService } from '@/index.js'
import { SensoringCapability } from '@/core/domain/Capability.js'
import {
  humidityMeasurement,
  pressureMeasurement,
  temperatureMeasurement
} from '@/resources/sampleMeasurements.js'
import path from 'path'
import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'

class Simulation {
  private interval: any
  private ffmpegProcess: FfmpegCommand = ffmpeg()

  public start = async (producer: KafkaProducer): Promise<void> => {
    console.log('Simulation started')
    this.interval = setInterval(
      async (): Promise<void> => {
        producer.produce(`measurements.${thingService.getId()}`, temperatureMeasurement())
        producer.produce(`measurements.${thingService.getId()}`, humidityMeasurement())
        producer.produce(`measurements.${thingService.getId()}`, pressureMeasurement())
      },
      (thingService.getState().capabilities[0] as SensoringCapability).capturingInterval
    )
    console.log('Event: Measurements are being produced every 2.5s (capturingInterval)')

    await this.produceVideo()
  }

  public stop = (): void => {
    clearInterval(this.interval)
    this.ffmpegProcess.kill('SIGINT')
  }

  private produceVideo = async (): Promise<void> => {
    ffmpeg.setFfmpegPath(ffmpegInstaller.path)
    const inputFilePath: string = 'video.mp4'
    const rtspStreamUrl: string = `rtsp://${MEDIA_SERVER_HOST}:${MEDIA_SERVER_RTSP_PORT}/${THING_ID}/stream`

    //command line corresponding command:
    //ffmpeg -re -stream_loop -1 -i path-to-video.mp4 -c:v libx264 -bf 0 -f rtsp -rtsp_transport tcp rtsp://localhost:8554/${THING_ID}/stream
    this.ffmpegProcess = ffmpeg()
      .input(path.resolve(`src/resources/${inputFilePath}`))
      .inputFormat('mp4')
      .inputOptions(['-re', '-stream_loop', '-1'])
      .videoCodec('libx264')
      .addOption('-bf', '0')
      .outputFormat('rtsp')
      .outputOptions(['-rtsp_transport tcp'])
      .output(rtspStreamUrl)
      .on('start', () => {
        console.log(`Event: Video conversion and publishing started at RTSP Stream URL: ${rtspStreamUrl}`)
      })
      .on('end', () => {
        console.log('Video conversion and publishing ended')
      })
      .on('error', (err, stdout, stderr): void => {
        if (err) {
          console.log('stdout:\n' + stdout)
          console.log('stderr:\n' + stderr)
        }
      })

    this.ffmpegProcess.run()
  }
}

export const simulation: Simulation = new Simulation()
