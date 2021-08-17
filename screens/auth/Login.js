import React, { useState } from 'react'
import { View } from 'react-native'

import * as api from '../../services/auth'
import { useAuth } from '../../providers/auth'

import Form, { TYPES } from 'react-native-basic-form'
import CTA from '../../components/CTA'
import { Header, ErrorText } from '../../components/Shared'

// function useForceUpdate(){
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => value + 1); // update the state to force render
// }

export default function Login(props) {
  const { navigation } = props
  const { navigate } = navigation
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { handleLogin } = useAuth()
  // const forceUpdate = useForceUpdate();

  const fields = [
    {name: 'userEmail', label: 'Adresse email', required: true, type: TYPES.Email},
    {name: 'userPassword', label: 'Mot de passe', required: true, secure: true}
  ]

  async function onSubmit(state) {
    setLoading(true)

    try {
      let response = await api.login(state)
      await handleLogin(response)

      setLoading(false)

      let username = (response.user.username !== null)
      if(username) navigate('Dashboard')
      // if(username) forceUpdate()
      else navigation.replace('Username')
    } catch(error) {
      setError(error.message)
      setLoading(false)
    }
  }

  let formProps = { title: 'Se connecter', fields, onSubmit, loading }
  
  return(
    <View style={{
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#fff'
    }}>
      <Header title={'Se connecter'} />
      <View style={{ flex: 1 }}>
        <ErrorText error={error} />
        <Form { ...formProps }>
          <CTA
            ctaText={'Mot de passe oublié ?'}
            onPress={ () => navigation.navigate('ForgotPassword') }
            style={{ marginTop: 20 }}
          />
          <CTA
            title={"Pas encore de compte ?"}
            ctaText={"S'inscrire"}
            onPress={ () => navigation.replace('Register') }
            style={{ marginTop: 50 }}
          />
        </Form>
      </View>
    </View>
  )
}

Login.navigationOptions = ({}) => {
  return {
    title: ``
  }
}