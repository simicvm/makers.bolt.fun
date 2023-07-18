1. "prism schema": This is the data schema that all the files will use to generate the CMS. It will define the structure of the Tournament, TournamentJudge, TournamentPrize, TournamentTrack, TournamentEvent, and HostedImage.

2. "CRUD operations": All the files will share the same CRUD (Create, Read, Update, Delete) operations. These operations will be used to manipulate the data of the Tournament, TournamentJudge, TournamentPrize, TournamentTrack, TournamentEvent, and HostedImage.

3. "Tailwind + React": All the files will use Tailwind CSS for styling and React for building the user interface.

4. "src/features/CMS": This is the shared directory where all the files will be located.

5. "SingleImageUploadInput.tsx": This is a shared component that will be imported in any of the HostedInput fields. It is a drag and drop image uploader.

6. "TypeScript": All the files will be written in TypeScript language.

7. "HostedInput fields": These are the fields in the HostedImage file that will use the SingleImageUploadInput.tsx component.

8. "CMS": This is the shared context of all the files, as they are all part of the Content Management System.

9. "Tournament, TournamentJudge, TournamentPrize, TournamentTrack, TournamentEvent, HostedImage": These are the shared entities that the CMS will manage. Each of these entities will have its own file.

10. "React Component Function Names": Each file will likely have a main React component function (e.g., Tournament(), TournamentJudge(), etc.) and potentially other shared helper functions for handling events, state, etc.