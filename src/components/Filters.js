import React from "react";
import { View, Switch, Text, StyleSheet } from "react-native";

export default function Filters({ veg, nonVeg, setVeg, setNonVeg }) {
  return (
 
      <View style={styles.filterContainer}>
        <View style={styles.row}>
          <Switch 
            value={veg} 

            onValueChange={setVeg}
            thumbColor={veg ? "#4CAF50" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81c784" }}
          />
        </View>
        <View style={styles.row}>
          <Switch 
            value={nonVeg} 
            onValueChange={setNonVeg}
            thumbColor={nonVeg ? "#F44336" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#e57373" }}
          />
        </View>
      </View>

  );
}

const styles = StyleSheet.create({
  filterContainer:{
    display: 'flex',
    flexDirection:'row'
  },
  row: { 
    borderWidth: 1,
    borderColor: '#dfebebff',
    borderRadius: 12,
    padding: 4,
    margin: 4, 
    alignItems: "center" 
  },

});