import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { getDecks, deleteDeck } from "../utils/flashcardsAPI";
import { Decks } from "../utils/types";
import Alert from "../components/primitives/Alert";
import Container from "../components/primitives/Container";
import Button from "../components/primitives/Button";

interface S {
  decks: Decks | {};
  decksIds: string[] | any[];
}

class DecksList extends React.Component<any, Decks | {}> {
  state = { decks: [], hasError: false };

  componentDidMount() {
    getDecks()
      .then(decks => {
        this.setState({ decks });
      })
      .catch(err => this.setState({ hasError: true }));
  }

  render() {
    const { decks, hasError } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView>
        {hasError && alert("something wrong hapenned")}
        {decks.length === 0 && (
          <Container>
            <Alert style={styles.alert}>No deck to choose</Alert>
          </Container>
        )}
        {decks.map(deck => (
          <TouchableOpacity
            key={deck.id}
            onPress={() => navigation.navigate("DeckDetail", { deck })}
          >
            <View style={styles.container}>
              <Text style={styles.bigText}>{deck.title}</Text>
              <Text style={styles.smallText}>{deck.cards.length} cards</Text>
            </View>
          </TouchableOpacity>
        ))}
        <Button
          title="Add deck"
          onPress={() => navigation.navigate("AddDeck")}
          color="black"
          primary
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  smallText: {
    fontSize: 20,
    margin: 10,
    color: "grey",
  },
  bigText: {
    margin: 10,
    fontSize: 30,
  },
  alert: {
    marginTop: 60,
  },
});

export default DecksList;
