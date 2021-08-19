import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Card  } from 'react-native-elements';
import { useAuth } from '../../providers/auth'

// A faire: récupérer les roles pour proposer des actions pertinentes
// A finir: Ouverture du PDF stockés en local avec une librairie de PDF sur la page générer un état des lieux
// A finir: Calendrier, A filtrer uniquement sur agent et secretaire

export default function Home(props) {
  const { navigate } = props.navigation
  const { state, handleLogout } = useAuth()
  const user = state.user

  return(
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
      <Card style={{ justifyContent: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginBottom: 25}}>{ user != undefined ? `Bonjour ${user.userFirstname} !` : navigate('Login')}</Text>
        <Text><Text style={{marginBottom: 6, fontWeight: 'bold', fontSize: 15}}>Votre mail:</Text> {user.userEmail}</Text>
        <Text><Text style={{marginBottom: 10, fontWeight: 'bold', fontSize: 15}}>Votre adresse:</Text> {user.userAdr}</Text>

        <View>
          <TouchableOpacity 
            style={{width: 350,height: 50,color: 'white',backgroundColor: 'pink',textAlign:'center',justifyContent: 'center',padding: 10,marginTop: 10}} 
            onPress={()=> navigate('Calendar')}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Voir mes RDV
              </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{width: 350,height: 50,color: 'white',backgroundColor: 'pink',textAlign:'center',justifyContent: 'center',padding: 10,marginTop: 10}} 
            onPress={()=> navigate('GeneratePDF')}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Générer un état des lieux
              </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{width: 350,height: 50,color: 'white',backgroundColor: 'pink',textAlign:'center',justifyContent: 'center',padding: 10,marginTop: 10}} 
            onPress={()=> navigate('UpdateProfil')}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Modifier mon profil
              </Text> 
          </TouchableOpacity>          
          <TouchableOpacity 
            style={{width: 350,height: 50,color: 'white',backgroundColor: 'pink',textAlign:'center',justifyContent: 'center',padding: 10,marginTop: 10}} 
            onPress={()=> {handleLogout()}} >
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Me déconnecter
              </Text> 
          </TouchableOpacity>
      </View>
    </Card>
  </View>
  )  
}