function genError(message: string, code: number) {
    throw {message: message, Code: code};
}

genError("Erronr gene", 500)