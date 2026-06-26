drop table if exists security_alerts;
drop table if exists login_attempts;
drop table if exists users;

create table users (
    id serial primary key,
    username varchar(50) unique not null,
    email varchar(100) unique not null,
    password_hash text not null,
    role varchar(20) default 'user',
    created_at timestamp default current_timestamp
);

create table login_attempts (
    id serial primary key,
    user_id integer references users(id),
    username_attempted varchar(50),
    ip_address varchar(45) not null,
    success boolean not null,
    attempted_at timestamp default current_timestamp
);

create table security_alerts (
    id serial primary key,
    alert_type varchar(50) not null,
    message text not null,
    ip_address varchar(45),
    created_at timestamp default current_timestamp,
    resolved boolean default false
);