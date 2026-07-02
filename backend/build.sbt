name := """play-demo"""
organization := "com.example"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean)
//scalaVersion := "2.13.18"
scalaVersion := "2.11.12"
//libraryDependencies += guice

//libraryDependencies ++= Seq(
//  guice,
//  javaJdbc,
//  javaJpa,
//  "mysql" % "mysql-connector-java" % "8.0.33",
//  "org.mindrot" % "jbcrypt" % "0.4",
//  "com.auth0" % "java-jwt" % "4.4.0"
//)

libraryDependencies ++= Seq(
//  guice,
  javaJdbc,
  "mysql" % "mysql-connector-java" % "5.1.49",

  "org.mindrot" % "jbcrypt" % "0.4",
  "com.auth0" % "java-jwt" % "3.19.2",
  "org.apache.pdfbox" % "pdfbox" % "2.0.30",
  filters,
  "com.sun.mail" % "javax.mail" % "1.6.2"
)
