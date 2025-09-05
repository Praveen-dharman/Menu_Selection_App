import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  TouchableWithoutFeedback 
} from "react-native";
import dishesData from "../data/dishes.json";
import ingredientsData from "../data/ingredients.json";

export default function IngredientScreen({ route, navigation }) {
  const { dishId } = route.params;
  const dish = dishesData.find((d) => d.id === dishId);
  const ingredients = ingredientsData[dishId] || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require("../assets/left-arrow.png")}
            style={styles.img}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{dish.name}</Text>
      </View>
      
      <View style={styles.descContainer}>
        <Text style={styles.desc}>{dish.description}</Text>
        <Image
          source={require('../assets/ingredient.jpg')} 
          style={styles.descImg}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.servingInfo}>
        <Text style={styles.servingText}>Ingredients</Text>
        <Text style={styles.servingText}>For 2 people</Text>
      </View>
      
      <View style={styles.ingredientsContainer}>
        {ingredients.map((item, index) => (
          <View key={index} style={styles.ingredientRow}>
            <Text style={styles.ingredientName}>{item.name}</Text>
            <Text style={styles.ingredientQuantity}>{item.quantity}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff" 
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 8,
    gap: 4
  },
  backButton: {
    padding: 4, // Adds touch area around the arrow
  },
  title: { 
    marginTop: 4,
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  descContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  desc: { 
    fontSize: 16, 
    color: "gray", 
    lineHeight: 22,
    flex: 1,
    marginRight: 10,
  },
  img: {
    width: 15,
    height: 15,
    tintColor: "#242424ff",
  },
  descImg: {
    marginRight: -18,
    width: 200, 
    height: 200, 
  },
  servingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  servingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  ingredientsContainer: {
    marginBottom: 30,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  ingredientName: {
    fontSize: 16,
    color: "#333",
  },
  ingredientQuantity: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
});