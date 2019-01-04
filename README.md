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

LOCALE_PATH=./components/edu/sche_class_teachers npm run add-locale en vi
LOCALE_PATH=./components/edu/sche_class_teachers npm run extract
LOCALE_PATH=./locales/edu/class_teachers npm run add-locale en vi
msgcat ./components/edu/sche_class_teachers/locales/en/messages.po ./layouts/sider/locales/en/messages.po ./layouts/header/locales/en/messages.po --output-file=./locales/edu/class_teachers/locales/en/messages.po

msgcat ./components/edu/sche_class_enrollments/locales/vi/messages.po ./layouts/sider/locales/vi/messages.po ./layouts/header/locales/vi/messages.po --output-file=./locales/edu/class_teachers/locales/vi/messages.po

LOCALE_PATH=./locales/edu/class_teachers npm run compile

LOCALE_PATH=./components/edu/sche_ages npm run compile