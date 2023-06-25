# image-scanner-with-dockle

## What is

This is an AWS CDK Construct that allows you to scan a container image during CDK deployment layer with Dockle.

## Dockle

[Dockle](https://github.com/goodwithtech/dockle) is `Container Image Linter for Security, Helping build the Best-Practice Docker Image, Easy to start`.

## Usage

```
npm install image-scanner-with-dockle
```

```ts
import { ImageScannerWithDockle } from 'image-scanner-with-dockle';

const repository = new Repository(this, 'ImageRepository', {
  removalPolicy: RemovalPolicy.DESTROY,
  autoDeleteImages: true,
});

const image = new DockerImageAsset(this, 'DockerImage', {
  directory: resolve(__dirname, '../assets/lambda'),
  platform: Platform.LINUX_ARM64,
});

new ImageScannerWithDockle(this, 'ImageScannerWithDockle', {
  imageUri: image.imageUri,
  repository: image.repository,
  ignore: ['CIS-DI-0009'], // see https://github.com/goodwithtech/dockle#checkpoint-summary
});

// If the vulnerability is detected above, the following will not be executed
new ECRDeployment(this, 'DeployImage', {
  src: new DockerImageName(image.imageUri),
  dest: new DockerImageName(`${repository.repositoryUri}:latest`),
});
```
