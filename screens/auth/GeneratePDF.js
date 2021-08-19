import React, { useState } from 'react'
import { View } from 'react-native'
import * as FileSystem from 'expo-file-system'
import Sharing from 'expo-sharing'

import Form, { TYPES } from 'react-native-basic-form'
import { Header, ErrorText } from '../../components/Shared'

export default function Login(props) {
  const { navigation } = props
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const options = [
    {label:"T1 meublé", value: "T1-meublé.pdf"},
    {label:"T2, T3 meublé", value: "T2-T3-meublé.pdf"},
    {label:"T4, T5 meublé", value: "T4-T5-meublé.pdf"},
    {label:"Maison meublé", value:"MAISON-meublé.pdf"},
    {label:"Studio, T1, T2, T3, T4 vide", value:"STUDIO-T1-T2-T3-T4-T5-vide-meublé.pdf"},
    {label:"Maison vide", value: "MAISON-vide.pdf"},
  ];

  const fields = [ 
    {name: 'adress', label: 'Adresse', required: true }, 
    {name: 'propertyType', label: 'Type de propriété', required: true, type: TYPES.Dropdown, options: options},
    {name: 'note', label: 'Note privé', required: false, autoCorrect: true}
  ]

  async function onSubmit(state) {
    setLoading(true)
    const uri = "../../assets/pdf/" + state.propertyType;
    const [ selectedPDF, setSelectedPDF ] = useState("");
    setSelectedPDF({ localUri: uri });
    
    await Sharing.shareAsync(selectedPDF.localUri)
    setLoading(false)
  }

  let formProps = { title: 'Générer l\'état des lieux', fields, onSubmit, loading }
  
  return(
    <View style={{
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#fff'
    }}>
      <Header title={'Générer un état des lieux'} />
      <View style={{ flex: 1 }}>
        <ErrorText error={error} />
        <Form { ...formProps }>
        </Form>
      </View>
    </View>
  )
}