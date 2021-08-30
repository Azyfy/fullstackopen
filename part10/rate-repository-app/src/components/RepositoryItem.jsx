import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    image: theme.images.tinyLogo,
    container: {
        padding: 15,
        backgroundColor: "white",
        gap: 9,
    },
    languageContainer: {
        color: "white",
        textAlign: "center",
        width: 100,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        padding: 5,
    },
    detailsContainer: {
        flexDirection:"column", 
        flexWrap:"wrap",
        paddingLeft: 10,
    },
    descriptionText: {
        fontSize: theme.fontSizes.small,
        fontStyle: "italic",
    },

});

const RepositoryItem = ({ item }) => {

    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
    }

    const starsCount = kFormatter(item.stargazersCount);
    const forksCount = kFormatter(item.forksCount);
    const reviewCount = kFormatter(item.reviewCount);

    return(
        <View style={styles.container}>
            <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                <Image style={styles.image} source={{
                        uri: `${item.ownerAvatarUrl}`,
                }} />
                <View style={styles.detailsContainer} >
                    <Text>{item.fullName}</Text>
                    <Text style={styles.descriptionText} >{item.description}</Text>
                    <Text style={styles.languageContainer}> {item.language}</Text>
                </View>
            </View>
            <View style={{flexDirection:"row", gap: 11, flexWrap:"wrap"}}>
                <View style={{flexDirection:"column", flexWrap:"wrap"}} >
                    <Text >{starsCount}</Text>
                    <Text style={{color: "grey"}} >Stars</Text>
                </View>
                <View style={{flexDirection:"column", flexWrap:"wrap"}} >
                    <Text >{forksCount}</Text>
                    <Text style={{color: "grey"}} >Forks</Text>
                </View>
                <View style={{flexDirection:"column", flexWrap:"wrap"}} >
                    <Text >{reviewCount}</Text>
                    <Text style={{color: "grey"}} >Reviews</Text>
                </View>
                <View style={{flexDirection:"column", flexWrap:"wrap"}} >
                    <Text >{item.ratingAverage}</Text>
                    <Text style={{color: "grey"}} >Rating</Text>
                </View>
            </View>
        </View>
    );
};

export default RepositoryItem;