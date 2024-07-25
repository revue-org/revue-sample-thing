# Sample Thing for Revue

## Prerequisites

- [Docker](https://docker.com)

## Getting Started

To set up a new thing in Revue, you can just run the following command

```bash
docker run -d \
  --name revue-thing \
  --restart on-failure \
  --network revue-network \
  --env THING_ID=<THING_ID> \
  --env THING_PORT=<THING_PORT> \
  --env THING_LOCATION=<THING_LOCATION> \
  -p <THING_PORT>:<THING_PORT> \
  revue-thing
```

where `<THING_ID>` is the ID of the thing, `<THING_PORT>` is the port on which the thing will be listening,
and `<THING_LOCATION>` is the location of the thing.

It will pull the image from the Docker Hub and run the container with the specified configuration.

You can create many things by running the command multiple times with different configurations.

To use the thing within Revue, refer to the [Revue README](https://github.com/revue-org/revue).
