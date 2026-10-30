package com.project.Invento.handlers;

import com.project.Invento.exceptions.ProductNotFoundException;
import com.project.Invento.exceptions.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<String> handleException(ProductNotFoundException ex,  HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                ex.getMessage(),
                HttpStatus.NOT_FOUND.name(),
                request.getRequestURI(),
                HttpStatus.NOT_FOUND.value()
        );

        return new ResponseEntity<>(errorResponse.toString(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleException(UserNotFoundException ex,  HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                ex.getMessage(),
                HttpStatus.NOT_FOUND.name(),
                request.getRequestURI(),
                HttpStatus.NOT_FOUND.value()
        );

        return new ResponseEntity<>(errorResponse.toString(), HttpStatus.BAD_REQUEST);
    }
}
