import KafkaProducer from '@/handler/events/KafkaProducer.js'
import { MEDIA_SERVER_HOST, MEDIA_SERVER_RTSP_PORT, THING_ID, thingService } from '@/index.js'
import { SensoringCapability } from '@/core/domain/Capability.js'
import {
  humidityMeasurement,
  pressureMeasurement,
  temperatureMeasurement
} from '@/resources/sampleMeasurements.js'
import path from 'path'

import { spawn } from 'node:child_process'

import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'

class Simulation {
  private interval: any
  private ffmpegProcess: FfmpegCommand = ffmpeg()

  public start = async (producer: KafkaProducer): Promise<void> => {
    console.log('Simulation started')
    this.interval = setInterval(
      async (): Promise<void> => {
        const temperature = await temperatureMeasurement()
        const humidity = await humidityMeasurement()
        console.log(temperature)
        console.log(humidity)
        producer.produce(`measurements.${thingService.getId()}`, temperature)
        producer.produce(`measurements.${thingService.getId()}`, humidity)
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

    const video = spawn("rpicam-vid", ["-t", "0", "--flush", "1", "--bitrate", "2000000", "-g", "50", "--inline", "-o", "-"])
    if (video.stdout && video.stderr) {
      video.stderr.on("data", (chunck) => {
        // console.log(chunck)
      })
      this.ffmpegProcess = ffmpeg(video.stdout)
        .inputFormat('h264')
        .inputOptions(['-re'])
        .addOption("-c:v", "libx264")
        .addOption('-bf', '0')
        .addOption('-strict', 'experimental')
        .outputFormat('rtsp')
        .outputOptions(['-rtsp_transport tcp'])
        .output(rtspStreamUrl)
        .on('start', (commandLine) => {
          console.log(`Event: Video conversion and publishing started at RTSP Stream URL: ${rtspStreamUrl}`)
          console.log(`FFmpeg command: ${commandLine}`)
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
    //command line corresponding command:
    //ffmpeg -re -stream_loop -1 -i path-to-video.mp4 -c:v libx264 -bf 0 -f rtsp -rtsp_transport tcp rtsp://localhost:8554/${THING_ID}/stream
  }
}

export const simulation: Simulation = new Simulation()
