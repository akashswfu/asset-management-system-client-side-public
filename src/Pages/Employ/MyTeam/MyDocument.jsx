import React, { useRef } from "react";
import ReactDOM from "react-dom";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import useAuth from "../../../ReactHooks/useAuth";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    backgroundColor: "red",
  },
});

// Create Document Component
const MyDocument = () => {
  const { user, isLoading, loading } = useAuth();
  if (loading) {
    return <p>Loading.....</p>;
  }
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>{user.email}</Text>
      </View>
      <View style={styles.section}>
        <Text>dgga</Text>
      </View>
    </Page>
  </Document>;
};

export default MyDocument;
