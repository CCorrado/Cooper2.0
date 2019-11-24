package com.cooper.database.error

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

class ObjectNotFound(status: HttpStatus = HttpStatus.NOT_FOUND, override val message: String) : ResponseStatusException(status, message)
