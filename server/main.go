package main

import (
	"fmt"
	"net/http"
	"log"
	"github.com/rochita-sharma/golang-react-todo/router"
)

func main() {
	r:= router.Router()
	fmt.Println("Starting server on the port 9000...")
	log.Fatal(http.ListenAndServe(":9000", r)) // handle fatal error and serve the server
}