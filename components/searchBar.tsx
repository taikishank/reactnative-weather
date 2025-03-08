import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";


export default function SearchBar({ onSearch }: {onSearch: (text: string) => void}) {
    const [searchText, setSearchText] = useState<string>("");

    const handleInputChange = (text:string) => {
        setSearchText(text);
        onSearch(text);
        console.log("You typed: ", text);
    };

    return(
        <View style = {styles.search_bar}>
            <TextInput style = {styles.input} placeholder = "Enter City Name"
            value = {searchText} onChangeText={setSearchText}
            onSubmitEditing={() => onSearch(searchText)}
            returnKeyType="search"/> 
        </View>
    )
}

const styles = StyleSheet.create({
    search_bar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "gray",
        width: "90%",
        marginVertical: 10,
        alignSelf: "center",
        borderRadius: 5,
        height: 50,
        paddingLeft: 3,
      },
    input: {
        height: 40,
        width: "80%",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
    }
 });
  