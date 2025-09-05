import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const getDishImage = (dishName) => {
  try {
    const normalizedName = dishName.toLowerCase().trim();
    
    const imageMap = {
      'tandoori chicken': require('../assets/tandoori.jpg'),
      'dal makhani': require('../assets/dal_makhani.jpg'),
      'butter chicken': require('../assets/butter_chicken.jpg'),
      'chicken tikka': require('../assets/chicken_tikka.jpg'),
      'chole bhature': require('../assets/chole_bhature.jpg'),
      'aloo gobi': require('../assets/aloo_gobi.jpg'),
      'biryani': require('../assets/briyani.jpg'),
      'gulab jamun': require('../assets/gulab_jamun.jpg'),
      'jalebi': require('../assets/Jalebi.jpg'),
      'kheer': require('../assets/Kheer.jpg'),
      'paneer tikka': require('../assets/paneer_tikka.jpg'),
      'papadum': require('../assets/Papadum.jpg'),
      'raita': require('../assets/Raita.jpg'),
      'samosa': require('../assets/samosa.jpg'),
    };
    
    // Try exact match first
    if (imageMap[normalizedName]) {
      return imageMap[normalizedName];
    }
    
    // Try partial matching
    for (const [key, image] of Object.entries(imageMap)) {
      if (normalizedName.includes(key)) {
        return image;
      }
    }
    
    const fallbackImages = [
      require('../assets/Naan.jpg'),
      require('../assets/Butter Chicken.jpg'),
      require('../assets/dal makhani.jpg'),
      require('../assets/Aloo gobi.jpg'),
    ];
    const fallbackIndex = dishName.length % fallbackImages.length;
    return fallbackImages[fallbackIndex];
    
  } catch (error) {
    console.log('Image loading error for:', dishName, error);
    return require('../assets/Naan.jpg');
  }
};

export default function DishCard({ dish, isSelected, onToggle, onIngredient }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 80; // Character limit before showing "Read more"
  
  const shouldTruncate = dish.description && dish.description.length > maxLength;
  const displayText = expanded 
    ? dish.description 
    : shouldTruncate 
      ? dish.description.substring(0, maxLength)
      : dish.description;

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.dishInfo}>
          <Text style={styles.name}>{dish.name} </Text>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.desc}>
              {displayText || "Delicious dish prepared with authentic ingredients"}
              {shouldTruncate && !expanded && '... '}
              {shouldTruncate && (
                <Text 
                  style={styles.readMoreText}
                  onPress={() => setExpanded(!expanded)}
                >
                  {expanded ? 'Read less' : 'Read more'}
                </Text>
              )}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.ingredientButton}
            onPress={onIngredient}
          >
            <Text style={styles.ingredientText}>🥄 Ingredient</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.imageContainer}>
          <Image 
            source={getDishImage(dish.name)}
            style={styles.dishImage}
            resizeMode="cover"
          />
          
          <TouchableOpacity 
            style={[
              styles.actionButton,
              isSelected && styles.selectedButton
            ]}
            onPress={onToggle}
          >
            <Text style={[
              styles.actionText,
              isSelected && styles.selectedText
            ]}>
              {isSelected ? "Remove" : "Add +"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    padding: 16,
    alignItems: "flex-start",
  },
  dishInfo: {
    flex: 1,
    paddingRight: 16,
  },
  descriptionContainer: {
    marginBottom: 12,
  },
  name: { 
    fontSize: 18, 
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  desc: { 
    fontSize: 14, 
    color: "#666",
    lineHeight: 20,
  },
  readMoreText: {
    color: "#000000", // Black color
    fontWeight: "500",
  },
  ingredientButton: {
    alignSelf: "flex-start",
  },
  ingredientText: {
    fontSize: 14,
    color: "#FF8C00",
    fontWeight: "500",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  actionButton: {
    position: "absolute",
    bottom: -8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    minWidth: 60,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#49c14fff",
  },
  selectedText: {
    color: "#FF8C00",
    fontWeight: 'bold'
  },
});