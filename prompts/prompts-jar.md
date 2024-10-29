# Prompt 1
>@workspace
>
>Hello, you're an amazing backend expert.
>
>With the context of the backend only, I want to create a new GET endpoint with the path /position/:id/candidates
>
>This endpoint will retrieve all the candidates in progress for a specific position, meaning all the applications for a particular positionID. It should provide >the following basic information:
>
>Candidate’s full name (from the candidate table).
>current_interview_step: the phase of the process the candidate is in (from the application table).
>The candidate's average score. Remember that each interview (interview) conducted with the candidate has a score.
>The application uses a Hexagonal architecture with three layers: application, domain, and presentation. All the logic must be included in a new service in the >application layer.
>
>Follow the good practices and SOLID principles. Of course, add unit tests!
>
>Explain to me the different steps that you will apply and not generate the code for the moment. If it's necessary, ask me everything that you need.

# Prompt 2
>1. No, we don't want to add additional fields.
>2. No, you must create a new one.
>3. If the position doesn't exist, return a 404, if the id is an string and not an integer, return a 400 bad request.

# Prompt 3
>Give me the code of this step:
>
>Update Domain Models if Necessary Ensure that the domain models have the necessary methods to support the service logic. For example, the Application model should be able to fetch related Candidate and Interview data.

# Prompt 4
>#file:positionService.ts is using prisma directly, should use the domain entities

# Prompt 5
>I have an error when I tested the endpoint http://localhost:3010/position/1/candidates ewith Error, could you improve this error?

# Prompt 6
>I have this error: 'error' is of type 'unknown'.ts(18046)

# Prompt 7
>It's like the route wasn't registered properly in the system, the application returns a 404 not found error

# Prompt 8
>Could you add unit tests for #file:positionService.ts using jest? I want to add the tests in a specific folder called tests inside src

# Prompt 9
>Now, I want to create a new PUT endpoint with the path /candidate/:id. This endpoint will update the stage of the moved candidate. It allows modification of the current interview process phase for a specific candidate.
>
>Remember, the context of the application and the different layers that we have

# Prompt 10
>I have this error in #file:Application.ts Type '{ candidateId: number; }' is not assignable to type 'ApplicationWhereUniqueInput'. Type '{ candidateId: number; }' is not assignable to type '{ id: number; } & { id?: number | undefined; AND?: ApplicationWhereInput | ApplicationWhereInput[] | undefined; OR?: ApplicationWhereInput[] | undefined; ... 9 more ...; interviews?: InterviewListRelationFilter | undefined; }'. Property 'id' is missing in type '{ candidateId: number; }' but required in type '{ id: number; }'.ts(2322) index.d.ts(13162, 5): The expected type comes from property 'where' which is declared here on type '{ select?: ApplicationSelect<DefaultArgs> | null | undefined; include?: ApplicationInclude<DefaultArgs> | null | undefined; where: ApplicationWhereUniqueInput; }'

# Prompt 11
>Now, I have the following error in the file #file:candidateService.ts Type 'string' is not assignable to type 'number'.ts(2322)

# Prompt 12
>Sorry but I think you're wrong, if we're receiving a string for the currentInterviewStep, we need to translate the name of the step to the id in the #file:candidateService.js in the line 75. Could yo fix it?

# Prompt 13
>I still have the same error in the file #file:candidateService.js in the line 75: Type 'string' is not assignable to type 'number'.ts(2322)

# Prompt 14
>It seems the PUT endpoint doesn't exist for the application perspective

# Prompt 15
>@workspace Focus only in the backend folder.
>
>When the PUT endpoint candidates/1 receives the string currentInterviewStep, the application fails because it expects to use the value to find the InterviewStep with an integer in the file #file:candidateService.ts
>
>Could you fix the code to:
>
>first, find the InterviewStep by step name
>update the currentInterviewStep with the id of the interviewStep in the model #file:Application.ts
>Explain the steps before giving me the code, I will let you know when I want the code.

# Prompt 16
>Go ahead!

# Prompt 17
>I have this error in the #file:candidateService.ts Argument of type '{ where: { name: string; }; }' is not assignable to parameter of type 'number'.ts(2345)

# Prompt 18
>The method findOneBy doesn't exist, could you add in the #file:InterviewStep.ts ?

# Prompt 19
>Now I have this error in the #file:candidateService.ts Type 'number | undefined' is not assignable to type 'number'. Type 'undefined' is not assignable to type 'number'.ts(2322)


