package br.com.pucpr.gatosong.config.swagger;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        Contact contact = new Contact();
        contact.setName("Website Meownager");
        contact.setUrl("http://localhost:8080");
        return new OpenAPI()
                .info(new Info()
                        .title("Meownager - API")
                        .version("v1.0")
                        .contact(contact)
                        .description("API criada para documentar os endpoints"));
    }
}