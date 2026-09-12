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
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockle.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="image-scanner-with-dockle.ImageScannerWithDockle.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="image-scanner-with-dockle.ImageScannerWithDockle.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="image-scanner-with-dockle.ImageScannerWithDockle.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockle.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="image-scanner-with-dockle.ImageScannerWithDockle.isConstruct"></a>

```typescript
import { ImageScannerWithDockle } from 'image-scanner-with-dockle'

ImageScannerWithDockle.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

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
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockleProps.property.imageUri">imageUri</a></code> | <code>string</code> | Image URI for scan target. |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockleProps.property.repository">repository</a></code> | <code>aws-cdk-lib.aws_ecr.IRepository</code> | Repository including the image URI for scan target. |
| <code><a href="#image-scanner-with-dockle.ImageScannerWithDockleProps.property.ignore">ignore</a></code> | <code>string[]</code> | Checkpoints as ignore rules. |

---

##### `imageUri`<sup>Required</sup> <a name="imageUri" id="image-scanner-with-dockle.ImageScannerWithDockleProps.property.imageUri"></a>

```typescript
public readonly imageUri: string;
```

- *Type:* string

Image URI for scan target.

---

##### `repository`<sup>Required</sup> <a name="repository" id="image-scanner-with-dockle.ImageScannerWithDockleProps.property.repository"></a>

```typescript
public readonly repository: IRepository;
```

- *Type:* aws-cdk-lib.aws_ecr.IRepository

Repository including the image URI for scan target.

Because of grantPull to CustomResourceLambda.

---

##### `ignore`<sup>Optional</sup> <a name="ignore" id="image-scanner-with-dockle.ImageScannerWithDockleProps.property.ignore"></a>

```typescript
public readonly ignore: string[];
```

- *Type:* string[]

Checkpoints as ignore rules.

> [https://github.com/goodwithtech/dockle#checkpoint-summary](https://github.com/goodwithtech/dockle#checkpoint-summary)

---



