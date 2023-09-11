# image-scanner-with-dockle

## What is

This is an AWS CDK Construct that allows you to **scan container images with Dockle in CDK deployment layer**.

If it detects vulnerabilities, it can **prevent the image from being pushed to the ECR for the application**.

Since it takes an `imageUri` for ECR as an argument, it can also be used to **simply scan an existing image in the repository**.

For more information, please see [this blog](https://dev.to/aws-builders/container-image-scanning-with-dockle-in-aws-cdk-1bac).

## Dockle

[Dockle](https://github.com/goodwithtech/dockle) is `Container Image Linter for Security, Helping build the Best-Practice Docker Image, Easy to start`.

## Usage

- Install

```sh
npm install image-scanner-with-dockle
```

- CDK Code

```ts
import { ImageScannerWithDockle } from 'image-scanner-with-dockle';

const repository = new Repository(this, 'ImageRepository', {
  removalPolicy: RemovalPolicy.DESTROY,
  autoDeleteImages: true,
});

const image = new DockerImageAsset(this, 'DockerImage', {
  directory: resolve(__dirname, './'),
});

const imageScanner = new ImageScannerWithDockle(this, 'ImageScannerWithDockle', {
  imageUri: image.imageUri,
  repository: image.repository, // for grantPull to CustomResourceLambda
  ignore: ['CIS-DI-0009'], // See https://github.com/goodwithtech/dockle#checkpoint-summary
});

// By adding addDependency, if the vulnerabilities are detected by ImageScannerWithDockle, the following ECRDeployment will not be executed, deployment will fail.
const ecrDeployment = new ECRDeployment(this, 'DeployImage', {
  src: new DockerImageName(image.imageUri),
  dest: new DockerImageName(`${repository.repositoryUri}:latest`),
});
ecrDeployment.node.addDependency(imageScanner);
```

## API Reference

API Reference is [here](./API.md#api-reference-).
