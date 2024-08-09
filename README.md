# Job Posting BE (NodeJS Server)

## Module 1: user (5 APIs)
1. '/admin/register' - POST - to create a new admin
2. '/candidate/register' - POST - to create a new candidate
3. '/user/login' - POST - login for both users
4. '/user/forgot-password' - POST - reset password
5. '/user/user-by-token' - GET - get any type of user data by auth token

## Module 2: job (9 APIs) '/job'
1. '/add-category' - POST - to add a new category
2. '/get-category-list' - GET - get all category list
3. '/create-job' - POST - create a new job
4. '/fetch-jobs' - GET- fetch all jobs
5. '/fetch-job-by-id' - POST - fetch single job by id
6. '/apply-job' - POST - candidate apply for job
7. '/fetch-applied' - POST - fetch applied job for both admin and candidate
8. '/fetch-applied-by-id' - POST - fetch single applied job by id
9. '/accept-job' - POST - accept and reject job

## Middlewares (JWT)
1. User Middleware - to authenticate user sign in on each API request
