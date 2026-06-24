---
description: 'JSON处理中，Jackson、Gson和JSON-B通过自定义序列化/反序列化实现对象与JSON的灵活转换。Mixins允许在不修改类的情况下添加序列化注解，特别适合第三方类库。这些技术提升了数据绑定和格式控制的效率。'
lastUpdated: '2026-06-20 12:16:13'
head:
  - - meta
    - name: 'og:title'
      content: 'JSON'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'JSON处理中，Jackson、Gson和JSON-B通过自定义序列化/反序列化实现对象与JSON的灵活转换。Mixins允许在不修改类的情况下添加序列化注解，特别适合第三方类库。这些技术提升了数据绑定和格式控制的效率。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/core-features/json.html'
---
# JSON

Spring Boot 提供了与以下三种 JSON 映射库的集成：

- **Gson**
- **Jackson**
- **JSON-B**

其中，**Jackson** 是首选且默认使用的库。

## Jackson

Spring Boot 提供了 **Jackson** 的自动配置，并且 **Jackson** 是 `spring-boot-starter-json` 的一部分。

当 Jackson 位于类路径中时，Spring Boot 会自动配置一个 `ObjectMapper` Bean。

此外，还提供了多个配置属性，用于自定义 `ObjectMapper` 的配置

### 自定义序列化和反序列化

如果您使用 **Jackson** 来序列化和反序列化 JSON 数据，可能需要编写自定义的 `JsonSerializer` 和 `JsonDeserializer` 类。

通常，自定义的序列化器通过 Jackson 模块进行注册，但 Spring Boot 提供了一个替代的 `@JsonComponent` 注解，使得直接注册 Spring Bean 更加方便。

您可以直接将 `@JsonComponent` 注解应用于 `JsonSerializer`、`JsonDeserializer` 或 `KeyDeserializer` 实现类。

此外，还可以将其应用于包含序列化器/反序列化器作为内部类的外部类。以下是一个示例：

```Java
import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import org.springframework.boot.jackson.JsonComponent;

@JsonComponent
public class MyJsonComponent {

        public static class Serializer extends JsonSerializer<MyObject> {

                @Override
                public void serialize(MyObject value, JsonGenerator jgen, SerializerProvider serializers) throws IOException {
                        jgen.writeStartObject();
                        jgen.writeStringField("name", value.getName());
                        jgen.writeNumberField("age", value.getAge());
                        jgen.writeEndObject();
                }

        }

        public static class Deserializer extends JsonDeserializer<MyObject> {

                @Override
                public MyObject deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException {
                        ObjectCodec codec = jsonParser.getCodec();
                        JsonNode tree = codec.readTree(jsonParser);
                        String name = tree.get("name").textValue();
                        int age = tree.get("age").intValue();
                        return new MyObject(name, age);
                }

        }

}
```

所有 `@JsonComponent` Bean 都会被 `ApplicationContext` 自动注册到 Jackson 中。

由于 `@JsonComponent` 是用 `@Component` 元注解的，因此其遵循常规的组件扫描规则。

Spring Boot 还提供了 [`JsonObjectSerializer`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/jackson/JsonObjectSerializer.html) 和 [`JsonObjectDeserializer`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/jackson/JsonObjectDeserializer.html) 基类，

相较于标准的 Jackson 版本，这些基类在序列化对象时提供了有用的替代方案。

有关详细信息，请参阅 API 文档中的 [`JsonObjectSerializer`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/jackson/JsonObjectSerializer.html) 和 [`JsonObjectDeserializer`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/jackson/JsonObjectDeserializer.html)

上面的示例可以改写为使用 `JsonObjectSerializer` / `JsonObjectDeserializer`，如下所示：

```Java
import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.SerializerProvider;

import org.springframework.boot.jackson.JsonComponent;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.boot.jackson.JsonObjectSerializer;

@JsonComponent
public class MyJsonComponent {

        public static class Serializer extends JsonObjectSerializer<MyObject> {

                @Override
                protected void serializeObject(MyObject value, JsonGenerator jgen, SerializerProvider provider)
                                throws IOException {
                        jgen.writeStringField("name", value.getName());
                        jgen.writeNumberField("age", value.getAge());
                }

        }

        public static class Deserializer extends JsonObjectDeserializer<MyObject> {

                @Override
                protected MyObject deserializeObject(JsonParser jsonParser, DeserializationContext context, ObjectCodec codec,
                                JsonNode tree) throws IOException {
                        String name = nullSafeValue(tree.get("name"), String.class);
                        int age = nullSafeValue(tree.get("age"), Integer.class);
                        return new MyObject(name, age);
                }

        }

}
```

### Mixins

Jackson 支持 **mixins**，可以将额外的注解混入目标类上已有的注解中。Spring Boot 的 Jackson 自动配置会扫描应用程序包中带有 `@JsonMixin` 注解的类，并将其注册到自动配置的 `ObjectMapper` 中。这个注册操作由 Spring Boot 的 `JsonMixinModule` 执行。

## Gson

Spring Boot 提供对 **Gson** 的自动配置。当类路径中包含 **Gson** 时，会自动配置一个 `Gson` Bean。

可以通过多个 `spring.gson.*` 配置属性来自定义 Gson 的配置。如果需要更高级的控制，可以定义一个或多个 `GsonBuilderCustomizer` Bean 来实现。

## JSON-B

Spring Boot 提供对 **JSON-B** 的自动配置。当类路径中存在 **JSON-B API** 及其实现时，会自动配置一个 `Jsonb` Bean。推荐的 **JSON-B** 实现是 Eclipse Yasson，Spring Boot 已为其提供依赖管理支持