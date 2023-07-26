# On Deck coding challenge: newsfeed

## Requirements

We want to create a newsfeed for each fellowship that shows new and relevant events. The goal is to keep users up to date and to facilitate collaboration between them.

In general, there are three types of events:
- new people (DB table `users`),
- new projects (table `projects`),
- team announcements (table `announcements`).

However, each newsfeed should consist of different types of content because people from different fellowships are interested in different events:
- Founders want to connect to angels and other founders.
- Angels want to connect to founders and other angels.
- Founders and angels are interested in new founders' projects.
- Writers want to connect only to other writers and are not interested in founders' projects.

Announcements can be addressed to a specific fellowship, or to all users (see table `announcements`, column `fellowship`). Founders are not interested in announcements addressed to writers, and so on.

## Part 1: coding task

Implement the newsfeed:
- It should include users, projects, and announcements.
- It should display different results, depending on the selected fellowship, as described in the "Setting" section above.
- Entries should be sorted by creation date, newer entries go first.
- Implement infinite scrolling, don't download and display all entries at once.

Tips:
- You can change any part of the application — DB connection, GraphQL server/client, styled-components — if you are more comfortable or productive with something else.
- You can change the project structure as you see fit.
- You can add any NPM package you need to implement new features or improve the existing code.
- You can reuse the existing React components, or modify them so they fit better in the newsfeed.
- Don't spend much time creating beautiful UI, just make it look consistent.

## Part 2: questions

Please submit written answers to these questions:
1. How could you modify the project setup to improve type safety, code reuse, testability, and general code quality?
2. What technical challenges do you see for the same project at scale? How would you address them? Assume there are tens of thousands of users in tens of different fellowships.
3. What product/UI challenges do you see for the same project at scale? How would you address them?

## How to submit

1. Use a separate repo for the solution. Don't fork it, use this [guide for mirroring repos](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository#mirroring-a-repository).
2. Create a short Loom recording of UI and code walk-through.
3. Write the answers to the questions in a Notion or any other kind of shared doc.
4. Send everything above via an email to your contact at On Deck.

## Project structure

Tech stack:
- Next.js,
- TypeScript,
- Sqlite3,
- Apollo server,
- Apollo client,
- React.

Folder structure:
- `components/` — reusable React components;
- `pages/` — the usual Next.js [page structure](https://nextjs.org/docs/basic-features/pages);
- `graphql/` — GraphQL server, schema, resolvers, DB connection;
- `scripts/` — contains the SQL script used for creating and populating the tables in `db.sqlite`.

The database is already included in the repo (`db.sqlite`) and populated (`scripts/populate.sql`). Its basic structure:
- `users` — people participating in fellowships;
- `projects` — projects that founders are working on (connected to `users` through `user_projects`);
- `announcements` — announcements by On Deck Team targeting specific fellowships or global (`fellowship = "all"`).
  
## Delivery

### Part 1

<aside>
💡 This section lists the challenge requirements and my answers and comments to them.

</aside>

#### Requirement 1

<aside>
💡 It should include users, projects, and announcements.

</aside>

##### Mario Ruiz Diaz's comments

Done ✅ 

Two different lists were created

##### Announcements

- Shows only announcements related to the selected profile view

### Users

- List with people related to the interest of the selected Profile
- In the case of founders, the related projects are listed on every card

#### Requirement 2

<aside>
💡 It should display different results, depending on the selected fellowship, as described in the "Setting" section above.

</aside>

##### Mario Ruiz Diaz's comments

Done ✅ 

Both lists show items related to the interest of the selected Profile view

#### Requirement 3

<aside>
💡 Entries should be sorted by creation date, newer entries go first.

</aside>

##### Mario Ruiz Diaz's comments

Done ✅ 

#### Requirement 4

<aside>
💡 Implement infinite scrolling, don't download and display all entries at once.

</aside>

##### Mario Ruiz Diaz's comments

Done ✅

### Part 2

#### Question 1

<aside>
💡 How could you modify the project setup to improve type safety, code reuse, testability, and general code quality?

</aside>

##### Mario Ruiz Diaz's comments

I would suggest the following:

- For Type safety, I would suggest to setup the project whit ESLint and Prettier
- Unit Tests with 100% of coverage for validating every line of code
- UN/UX Unit Test for all visual components to validate them without depending on the DOM. [Test Renderer](https://reactjs.org/docs/test-renderer.html) can be used.
- Continue Integration with testing and ESTLint validation to ensure that only tested and qualified code is merged to master branches

#### Question 2

<aside>
💡 What technical challenges do you see for the same project at scale? How would you address them? Assume there are tens of thousands of users in tens of different fellowships.

</aside>

##### Mario Ruiz Diaz's comments

###### Services and Layers

- I would suggest separating the handle in at least three different projects the database, backend, and the frontend.
- I would turn the backend into microservice architecture, grouping them by concerns (for instance) such as all user services (user, users, etc) together. This will allows us to scale them independently.

###### Reusable code and functionality

- I would create a side library/project with Business Object Types, in order to ensure that all project-based the Object model on the same Types. i.e. User type with all its attributes. The cross library could have some utility functionalities, such as parsing, fetches, etc.

###### Infrastructure

- To support the volume of concurrent users at scale, I would design the infrastructure based on Kubernetes. For this is needed:
    - To dockerize the services
    - Create the script for the CI (with CircleCI, GitHub Actions or other similar) to build and publish the docker images in some centralized registry, such us Docker Registry, gCloud, AWS, or other existing Cloud solutions
    - Create a project for building and destroying the infrastructure as code. It could be done with Terraform, Serverless, or others.
    - Create the CD workflows for Deploying/Updating the services into the different Kubernetes clusters.
    
    Having Kubernetes we will be able to scale the granular services based on the KPI usage.
    

###### Agnostic as much as possible

The agnostic philosophy allows us to avoid being tied to specific services, components, libraries, and even platforms. 

I would try to avoid using Cloud specific services as much as possible (i.e. AWS Lambas, SQS, etc).

By doing this, we could move the complete platform (apps and services) from one cloud to another by doing a couple of clicks.

###### Abstraction

I would try to avoid integrate components, such as SQLite without the implementation of a connector that respects an iDBConnector interface. In this way, the DB could be switched without problem in the future if we decide to change the DB technology. No refactor will be needed. The Provider pattern is great for this.

###### Clusterized Database

I would create a cluster for the database to be fully tolerant to failures. Backups and Disaster recovery will be needed as well

###### Observability

Observability is the art of monitoring not only the hardware (CPU, Memory, Disk, etc) but also the services KPIs, such as logs and tracing, and Metrics.

When we have microservices, the tracing becomes into Distributing Tracing. Implementing this is always a challenge because requires (depending on the selected technology) to deploy in k8s some Deamon/side service to collect metrics, logs, and tracing spans.

Technologies such as Elastic APM, Datadog, Solarwinds APM, Istio, and others can be used.

#### Question 3

<aside>
💡 What product/UI challenges do you see for the same project at scale? How would you address them?

</aside>

##### Mario Ruiz Diaz's comments

###### The global state of the web Application

When the apps have more than a few components and views it is recommended to implement some mechanism to handle the Global state of the application. 

I prefer to implement Redux for this.

In addition to this, I like to decouple the components and pages from the external API calls and subscriptions. Sagas combined with Redux is a great choice.

###### Data Access Layer

At scale, the data access methods will increase sustainability. I would suggest creating the classic CRUD operations to support the most used actions for accessing the DB, such as create, delete, update, readOne, readMany with flexible parameter definitions. 

In this way, 90% of operations will reuse these.

In regards to Graphql, I would avoid creating queries such as user and users. I would refactor users to support UI scenarios that require one or many user entries. 

<aside>
💡 ***In this way we could have:***

Graphql queries: ***users***, ***projects***, ***announcements*** executing only the ***readMany*** dataAccessLayer method to support the following UI scenarios:

1. Show one User
2. Show a list of Users (with paging)
3. Show one Project
4. Show a list of Projects (with paging)
5. Show one Announcement
6. Show a list of Announcements (with paging)

</aside>

###### UI Components

In regards to the UI component, I would like to create abstract scenarios to detect those components that can be merged into one more generic one. i.e.: The two scrollable list that I created (Users.tsx and Announcements.tsx) could be merged into a more generic one that accepts a query, queryVars, queryData, item Type by parameters.
