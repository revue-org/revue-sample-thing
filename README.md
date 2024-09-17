# Sample Thing for Revue

This repository contains a sample (WoT) thing for Revue.
It is WoT compliant and can be used as a template to create your own thing.
By default, the thing simulates sensing and video capabilities.

To federate the thing with Revue, refer to the [Revue Readme](https://github.com/revue-org/revue)

## Prerequisites

- [Docker](https://docker.com)

## Getting Started

To set up a new thing in Revue, you have to run the following command:

```bash
docker run -d \
  --name revue-thing \
  --restart on-failure \
  # --network revue-network \  Uncomment only if Revue is run with Docker Compose on the same machine
  --env THING_ID=<THING_ID> \
  --env THING_PORT=<THING_PORT> \
  --env THING_LOCATION=<THING_LOCATION> \
  --env KAFKA_HOST_1=<KAFKA_IP_ADDRESS_1> \
  --env KAFKA_PORT_1=<KAFKA_PORT_1> \
  --env KAFKA_HOST_2=<KAFKA_IP_ADDRESS_2> \
  --env KAFKA_PORT_2=<KAFKA_PORT_2> \
  # Needed Media Server config only for video capability
  --env MEDIA_SERVER_HOST=<MEDIA_SERVER_HOST> \
  --env MEDIA_SERVER_RTSP_PORT=<MEDIA_SERVER_RTSP_PORT> \
  -p <THING_PORT>:<THING_PORT> \
  letsdothisshared/revue-thing
```

You can configure the thing by setting the environment variables, keeping in mind that:

- `<THING_ID>` is the ID of the thing
- `<THING_PORT>` is the port on which the thing will be listening
- `<THING_LOCATION>` is the location of the thing
- `<KAFKA_IP_ADDRESS_1>` is the IP address of the first Kafka broker
- `<KAFKA_IP_ADDRESS_2>` is the IP address of the second Kafka broker
- `<KAFKA_PORT_1>` and `<KAFKA_PORT_2>` are respectively
    - 9092 and 9093 if you are running Revue with Docker Compose on the same machine (internal)
    - 9094 and 9095 if the thing is not in the same network (external)
- `<MEDIA_SERVER_HOST>` is the IP address of the media server
    - 172.25.0.50 if you are running Revue with Docker Compose on the same machine
- `<MEDIA_SERVER_RTSP_PORT>` is the RTSP port of the media server
    - 8554 by default

