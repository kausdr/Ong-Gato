package br.com.pucpr.gatosong.exception;

public class UsedEmailException extends Exception{

    public UsedEmailException() {
        super();
    }

    public UsedEmailException(String message) {
        super(message);
    }
}
