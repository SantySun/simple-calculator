import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import NumberPad from "./components/NumberPad"
import _ from "lodash"

export default function App() {
  const [expression, setExpression] = useState<string>("")
  const [result, setResult] = useState<string>()
  const [numbers, setNumbers] = useState<Array<string>>([""])

  useEffect(() => {
    const currentNumbers = expression.split("*")
    setNumbers(currentNumbers)
  }, [expression])

  useEffect(() => {
    if (_.last(numbers)) {
      setResult(eval(expression))
    } else if (numbers.length > 1) {
      setResult(eval(numbers.slice(0, -1).join("*")))
    } else if (numbers.length === 1) {
      setResult("0")
    }
  }, [numbers])
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.expressionContainer}>
        <Text style={styles.expressionText}>{expression}</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <NumberPad onExpressionChange={setExpression} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  expressionText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#666"
  },
  resultText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222200"
  },
  expressionContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: 10,
    marginTop: 50,
    padding: 30
  },
  resultContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 10
  }
})
