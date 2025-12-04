import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

// Interface que representa o formato dos dados da API
interface Post {
  id: number;
  title: string;
  body: string;
}

export default function App() {

  // Estado que guarda os posts recebidos da API
  const [posts, setPosts] = useState<Post[]>([]);

  // Estado que indica se os dados ainda estão carregando
  const [carregando, setCarregando] = useState(true);

  // Função responsável por buscar os dados da API
  const buscarPosts = async () => {
    try {
      const resposta = await fetch("https://jsonplaceholder.typicode.com/posts");
      const dados = await resposta.json();
      setPosts(dados);
    } catch (erro) {
      console.log("Erro ao buscar posts:", erro);
    } finally {
      setCarregando(false);
    }
  };

  // Executa a busca assim que o app inicia
  useEffect(() => {
    buscarPosts();
  }, []);

  // Tela de carregamento enquanto busca os dados
  if (carregando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  // Tela que exibe a lista de posts
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📌 Lista de Postagens</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
});
