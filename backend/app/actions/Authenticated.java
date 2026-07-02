package actions;

import play.mvc.With;

import java.lang.annotation.*;

@With(AuthAction.class)
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Authenticated {
}