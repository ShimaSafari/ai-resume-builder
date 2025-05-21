# 💙 AI Resume Builder 💙


## This project is an AI-powered resume builder built with React.js, Vite, Shadcn/ui, Clerk, Strapi, Gemini API, and Supabase.


<img src="/public/LandingPage.png">


## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.


## Learn More

To learn all about React.js and Other tools, take a look at the following resources:

- [Vite Documentation](https://vitejs.dev/)

- [React.js Documentation](https://react.dev/)

- [Learn React Router DOM](https://reactrouter.com/en/main)

- [Learn shadcn/ui](https://ui.shadcn.com/)

- [Learn TailwindCSS](https://tailwindcss.com/)

- [Learn Strapi CMS](https://strapi.io/)

- [Learn Clerk Auth](https://clerk.com/)

- [Learn Gemini API](https://ai.google.dev/gemini-api)



## Folder Structure
```
📁node_modules
📁public
📁service
    AIModal.js
📁src
    App.css
    App.jsx
    📁assets
    📁auth
        📁sign-in
            index.jsx
    📁components
        📁custom
            ErrorPage.jsx
            Header.jsx
    📁context
        ResumeInfoContext.jsx
    📁dashboard
        📁dash-components
            AddResume.jsx
            ResumeCardItem.jsx
        index.jsx
        📁resume
            📁components
                📁forms
                    Education.jsx
                    Experience.jsx
                    PersonalDetail.jsx
                    Skills.jsx
                    Summary.jsx
                FormSection.jsx
                📁preview
                    EducationalPreview.jsx
                    ExperiencePreview.jsx
                    PersonalDetailPreview.jsx
                    SkillsPreview.jsx
                    SummaryPreview.jsx
                ResumePreview.jsx
                RichTextEditor.jsx
                ThemeColor.jsx
            📁[resumeId]
                📁edit
                    index.jsx
    📁home
        index.jsx
    index.css
    📁my-resume
        📁[resumeId]
            📁view
                index.jsx

index.html
jsconfig.json
package-lock.json
package.json
postcss.config.js
README.md
tailwind.config.js
vite.config.js
```
