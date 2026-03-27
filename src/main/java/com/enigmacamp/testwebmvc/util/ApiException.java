package com.enigmacamp.testwebmvc.util;

public class ApiException extends RuntimeException {
    public ApiException(String message) {
        super(message);
    }
}