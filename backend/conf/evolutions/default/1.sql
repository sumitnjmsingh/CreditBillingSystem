# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table application_logs (
  log_id                        bigint auto_increment not null,
  level                         varchar(255),
  module                        varchar(255),
  message                       varchar(10000),
  stack_trace                   longtext,
  created_at                    datetime(6),
  constraint pk_application_logs primary key (log_id)
);

create table billing_statements (
  statement_id                  bigint auto_increment not null,
  previous_balance              double,
  current_balance               double,
  outstanding_balance           double,
  minimum_due                   double,
  interest                      double,
  late_fee                      double,
  gst                           double,
  available_credit              double,
  billing_date                  date,
  due_date                      date,
  paid                          tinyint(1) default 0,
  payment                       double,
  card_id                       bigint,
  created_at                    datetime(6),
  updated_at                    datetime(6),
  constraint pk_billing_statements primary key (statement_id)
);

create table credit_cards (
  card_id                       bigint auto_increment not null,
  card_number                   varchar(255) not null,
  card_holder_name              varchar(255) not null,
  expiry_date                   date not null,
  encrypted_cvv                 varchar(255) not null,
  card_type                     varchar(255) not null,
  card_variant                  varchar(255) not null,
  credit_limit                  double not null,
  available_limit               double not null,
  used_limit                    double not null,
  blocked                       tinyint(1) default 0 not null,
  active                        tinyint(1) default 0 not null,
  status                        varchar(255) not null,
  billing_date                  integer not null,
  payment_due_date              integer not null,
  joining_date                  date not null,
  reward_points                 integer,
  cashback_earned               double,
  created_at                    datetime(6),
  updated_at                    datetime(6),
  user_id                       bigint,
  constraint uq_credit_cards_card_number unique (card_number),
  constraint pk_credit_cards primary key (card_id)
);

create table payments (
  payment_id                    bigint auto_increment not null,
  card_id                       bigint,
  amount                        double not null,
  payment_date                  date not null,
  payment_mode                  varchar(255) not null,
  payment_status                varchar(255) not null,
  reference_number              varchar(255) not null,
  remarks                       varchar(500),
  created_at                    datetime(6),
  constraint uq_payments_reference_number unique (reference_number),
  constraint pk_payments primary key (payment_id)
);

create table reward_transactions (
  reward_id                     bigint auto_increment not null,
  card_id                       bigint,
  transaction_id                bigint,
  points_earned                 integer not null,
  points_redeemed               integer not null,
  balance_after_transaction     integer not null,
  reward_type                   varchar(255) not null,
  remarks                       varchar(255),
  created_at                    datetime(6),
  constraint pk_reward_transactions primary key (reward_id)
);

create table transactions (
  transaction_id                bigint auto_increment not null,
  merchant_name                 varchar(255) not null,
  merchant_category             varchar(255) not null,
  merchant_location             varchar(255),
  amount                        double not null,
  currency                      varchar(255) not null,
  transaction_date              date not null,
  transaction_time              time not null,
  payment_mode                  varchar(255) not null,
  status                        varchar(255) not null,
  reference_number              varchar(255) not null,
  billed                        tinyint(1) default 0,
  remarks                       varchar(500),
  created_at                    datetime(6),
  card_id                       bigint,
  constraint uq_transactions_reference_number unique (reference_number),
  constraint pk_transactions primary key (transaction_id)
);

create table users (
  user_id                       bigint auto_increment not null,
  user_name                     varchar(255) not null,
  user_email                    varchar(255) not null,
  user_password                 varchar(255) not null,
  date_of_birth                 date,
  pan_number                    varchar(255),
  aadhaar_number                varchar(255),
  phone_number                  varchar(255),
  address                       varchar(500),
  occupation                    varchar(255),
  annual_salary                 double,
  credit_score                  integer,
  reset_token                   varchar(255),
  reset_token_expiry            datetime(6),
  created_at                    datetime(6),
  updated_at                    datetime(6),
  constraint uq_users_user_email unique (user_email),
  constraint uq_users_pan_number unique (pan_number),
  constraint uq_users_aadhaar_number unique (aadhaar_number),
  constraint uq_users_phone_number unique (phone_number),
  constraint pk_users primary key (user_id)
);

alter table billing_statements add constraint fk_billing_statements_card_id foreign key (card_id) references credit_cards (card_id) on delete restrict on update restrict;
create index ix_billing_statements_card_id on billing_statements (card_id);

alter table credit_cards add constraint fk_credit_cards_user_id foreign key (user_id) references users (user_id) on delete restrict on update restrict;
create index ix_credit_cards_user_id on credit_cards (user_id);

alter table payments add constraint fk_payments_card_id foreign key (card_id) references credit_cards (card_id) on delete restrict on update restrict;
create index ix_payments_card_id on payments (card_id);

alter table reward_transactions add constraint fk_reward_transactions_card_id foreign key (card_id) references credit_cards (card_id) on delete restrict on update restrict;
create index ix_reward_transactions_card_id on reward_transactions (card_id);

alter table reward_transactions add constraint fk_reward_transactions_transaction_id foreign key (transaction_id) references transactions (transaction_id) on delete restrict on update restrict;
create index ix_reward_transactions_transaction_id on reward_transactions (transaction_id);

alter table transactions add constraint fk_transactions_card_id foreign key (card_id) references credit_cards (card_id) on delete restrict on update restrict;
create index ix_transactions_card_id on transactions (card_id);


# --- !Downs

alter table billing_statements drop foreign key fk_billing_statements_card_id;
drop index ix_billing_statements_card_id on billing_statements;

alter table credit_cards drop foreign key fk_credit_cards_user_id;
drop index ix_credit_cards_user_id on credit_cards;

alter table payments drop foreign key fk_payments_card_id;
drop index ix_payments_card_id on payments;

alter table reward_transactions drop foreign key fk_reward_transactions_card_id;
drop index ix_reward_transactions_card_id on reward_transactions;

alter table reward_transactions drop foreign key fk_reward_transactions_transaction_id;
drop index ix_reward_transactions_transaction_id on reward_transactions;

alter table transactions drop foreign key fk_transactions_card_id;
drop index ix_transactions_card_id on transactions;

drop table if exists application_logs;

drop table if exists billing_statements;

drop table if exists credit_cards;

drop table if exists payments;

drop table if exists reward_transactions;

drop table if exists transactions;

drop table if exists users;

