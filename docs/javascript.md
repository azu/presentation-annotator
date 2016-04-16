# JavaScript

Presentation of the architecture: http://azu.github.io/slide/2016/bikeshedjs/javascript-read-write-stack.html

## Store

- when a repository is changed, pull data from repository and update state of store
- when received event from UseCase, update state of store

## UseCase

- when the User do action, execute UseCase
- UseCase pull domain from repository, call domain behavior, and save domain to repository
- UseCase also can emit event to store indirect.

## Repository

- repository is a perpetuation layer
- repository is a abstract of database,
- repository save domain model or return domain model.
- when repository is changed, emit change to self.
    - store observe the repository changed event, and store should update

## Domain

- domain is a domain model
- domain has data and behavior!

Ref: https://tech.recruit-mp.co.jp/mobile/android-architecture/

