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

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ImageScannerWithDockle <a name="ImageScannerWithDockle" id="image-scanner-with-dockle.ImageScannerWithDockle"></a>

#### Initializers <a name="Initializers" id="image-scanner-with-dockle.ImageScannerWithDockle.Initializer"></a>

```typescript
import { ImageScannerWithDockle } from 'image-scanner-with-dockle'

new ImageScannerWithDockle(scope: Construct, id: string, props: ImageScannerWithDockleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockle.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockle.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockle.Initializer.parameter.props">props</a></code> | <code><a href="#image-scanner-with-dockle.ImageScannerWithDockleProps">ImageScannerWithDockleProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="image-scanner-with-dockle.ImageScannerWithDockle.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="image-scanner-with-dockle.ImageScannerWithDockle.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="image-scanner-with-dockle.ImageScannerWithDockle.Initializer.parameter.props"></a>

- *Type:* <a href="#image-scanner-with-dockle.ImageScannerWithDockleProps">ImageScannerWithDockleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockle.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="image-scanner-with-dockle.ImageScannerWithDockle.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockle.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="image-scanner-with-dockle.ImageScannerWithDockle.isConstruct"></a>

```typescript
import { ImageScannerWithDockle } from 'image-scanner-with-dockle'

ImageScannerWithDockle.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="image-scanner-with-dockle.ImageScannerWithDockle.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockle.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="image-scanner-with-dockle.ImageScannerWithDockle.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### ImageScannerWithDockleProps <a name="ImageScannerWithDockleProps" id="image-scanner-with-dockle.ImageScannerWithDockleProps"></a>

#### Initializer <a name="Initializer" id="image-scanner-with-dockle.ImageScannerWithDockleProps.Initializer"></a>

```typescript
import { ImageScannerWithDockleProps } from 'image-scanner-with-dockle'

const imageScannerWithDockleProps: ImageScannerWithDockleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockleProps.property.imageUri">imageUri</a></code> | <code>string</code> | *No description.* |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockleProps.property.repository">repository</a></code> | <code>aws-cdk-lib.aws_ecr.IRepository</code> | *No description.* |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockleProps.property.ignore">ignore</a></code> | <code>string[]</code> | *No description.* |

---

##### `imageUri`<sup>Required</sup> <a name="imageUri" id="image-scanner-with-dockle.ImageScannerWithDockleProps.property.imageUri"></a>

```typescript
public readonly imageUri: string;
```

- *Type:* string

---

##### `repository`<sup>Required</sup> <a name="repository" id="image-scanner-with-dockle.ImageScannerWithDockleProps.property.repository"></a>

```typescript
public readonly repository: IRepository;
```

- *Type:* aws-cdk-lib.aws_ecr.IRepository

---

##### `ignore`<sup>Optional</sup> <a name="ignore" id="image-scanner-with-dockle.ImageScannerWithDockleProps.property.ignore"></a>

```typescript
public readonly ignore: string[];
```

- *Type:* string[]

---



