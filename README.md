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
  sche_ages:__type(name: "sche_ages") {
    name
    columns:fields {
      title:name
      dataIndex:name
      key:name      
      description
      type {
        name
        description
      }
    }
  }
  sche_ages_update_input:__type(name: "sche_ages_set_input") {
    name
    columns:inputFields {
      title:name
      dataIndex:name
      key:name
      defaultValue
      description
      type {
        name
        description
      }
    }
  }
  sche_ages_insert_input:__type(name: "sche_ages_insert_input") {
    name
    columns:inputFields {
      title:name
      dataIndex:name
      key:name
      defaultValue
      description
      type {
        name
        description
      }
    }
  }
}
```
msgcat ./components/edu/sche_ages/locales/en/messages.po ./layouts/sider/locales/en/messages.po --output-file=./locales/edu/ages/locales/en/messages.po

msgcat ./components/edu/sche_ages/locales/vi/messages.po ./layouts/sider/locales/vi/messages.po --output-file=./locales/edu/ages/locales/vi/messages.po