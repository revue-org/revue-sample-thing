# Sample Thing for Revue — a distributed real-time system for video surveillance

## Prerequisites

- [Docker](https://docker.com)

## Getting Started

- Download the latest version from [Releases](https://github.com/revue-org/revue-sample-thing/releases)
- Unzip the archive
- Modify the `.env` file to fit your needs
- Run the following command in the root directory of the project

```bash
./deploy-thing.sh
```

To stop the system you can run

```bash
./undeploy-thing.sh
```

Once Revue is up and running, you can access the web interface at `http://localhost:8080` and in the device section you can see the new thing added to the system.
Moreover, you can enjoy creating new custom things and add them through the device section.

The default configuration can be found in the `.env` file and in the `resource` folder.

