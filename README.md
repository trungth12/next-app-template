# Deployments

## Generate JWT Secret

Go to [this](https://mkjwk.org/)

Choose SH1

```
query {
  meta:__type(name: "sche_ages") {
    name
    columns:fields {
      dataIndex:name
      key:name
    }
  }
}
```

```
query {
  __schema {
    types {
      name
      kind
      description
      fields{
        dataIndex:name
        key:name
      }
    }
  }
}
```