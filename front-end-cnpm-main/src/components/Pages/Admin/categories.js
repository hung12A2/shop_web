import {
    List,
    Datagrid,
    TextField,
    Edit,
    SimpleForm,
    EditButton,
    TextInput,
    Create,
    ImageField,
  } from 'react-admin'

  
  export const listProducts = (props) => (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='catename' />
        <ImageField source='image' />
        <EditButton basePath='/products' />
      </Datagrid>
    </List>
  )
  
  export const editProduct = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source='catename' />
        <TextInput source='image' />
      </SimpleForm>
    </Edit>
  )
  
  export const createProduct = (props) => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source='catename' />
        <TextInput source='image' />
      </SimpleForm>
    </Create>
  )