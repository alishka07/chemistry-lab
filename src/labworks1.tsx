interface LabWork {
  id: number;
  title: string;
  description?: string;
  theory?: string;
  equipment?: string[];
  procedure?: string[];
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number; // индекс правильного ответа
  }[];
  videos: {
    url: string;
    description: string;
  }[];
}

interface Quarter {
  id: number;
  title: string;
  labWorks: LabWork[];
}

export type { Quarter, LabWork };

// Функция для получения данных quarters на основе текущего языка (используя t из i18next)
export const getQuarters = (t: (key: string) => string): Quarter[] => {
  return [
    {
      id: 1,
      title: t('translation:quarters.q1.title'),
      labWorks: [ 
        {
          id: 1,
          title: t('translation:quarters.q1.labs.lab1.title'),
          description: t('translation:quarters.q1.labs.lab1.description'),
          theory: t('translation:quarters.q1.labs.lab1.theory'),
          equipment: [
            t('translation:quarters.q1.labs.lab1.equipment.0'),
            t('translation:quarters.q1.labs.lab1.equipment.1'),
            t('translation:quarters.q1.labs.lab1.equipment.2'),
            t('translation:quarters.q1.labs.lab1.equipment.3'),
            t('translation:quarters.q1.labs.lab1.equipment.4'),
          ],
          procedure: [
            t('translation:quarters.q1.labs.lab1.procedure.0'),
            t('translation:quarters.q1.labs.lab1.procedure.1'),
            t('translation:quarters.q1.labs.lab1.procedure.2'),
            t('translation:quarters.q1.labs.lab1.procedure.3'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q1.labs.lab1.quiz.q1.question'),
              options: [
                t('translation:quarters.q1.labs.lab1.quiz.q1.options.0'),
                t('translation:quarters.q1.labs.lab1.quiz.q1.options.1'),
                t('translation:quarters.q1.labs.lab1.quiz.q1.options.2'),
                t('translation:quarters.q1.labs.lab1.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab1.quiz.q2.question'),
              options: [
                t('translation:quarters.q1.labs.lab1.quiz.q2.options.0'),
                t('translation:quarters.q1.labs.lab1.quiz.q2.options.1'),
                t('translation:quarters.q1.labs.lab1.quiz.q2.options.2'),
                t('translation:quarters.q1.labs.lab1.quiz.q2.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q1.labs.lab1.quiz.q3.question'),
              options: [
                t('translation:quarters.q1.labs.lab1.quiz.q3.options.0'),
                t('translation:quarters.q1.labs.lab1.quiz.q3.options.1'),
                t('translation:quarters.q1.labs.lab1.quiz.q3.options.2'),
                t('translation:quarters.q1.labs.lab1.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab1.quiz.q4.question'),
              options: [
                t('translation:quarters.q1.labs.lab1.quiz.q4.options.0'),
                t('translation:quarters.q1.labs.lab1.quiz.q4.options.1'),
                t('translation:quarters.q1.labs.lab1.quiz.q4.options.2'),
                t('translation:quarters.q1.labs.lab1.quiz.q4.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q1.labs.lab1.quiz.q5.question'),
              options: [
                t('translation:quarters.q1.labs.lab1.quiz.q5.options.0'),
                t('translation:quarters.q1.labs.lab1.quiz.q5.options.1'),
                t('translation:quarters.q1.labs.lab1.quiz.q5.options.2'),
                t('translation:quarters.q1.labs.lab1.quiz.q5.options.3'),
              ],
              correctAnswer: 3,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/embed/WrPEosrV_c4",
              description: t('translation:quarters.q1.labs.lab1.videos.v1'),
            },
          ],
        },
        {
          id: 2,
          title: t('translation:quarters.q1.labs.lab2.title'),
          description: t('translation:quarters.q1.labs.lab2.description'),
          theory: t('translation:quarters.q1.labs.lab2.theory'),
          equipment: [
            t('translation:quarters.q1.labs.lab2.equipment.0'),
            t('translation:quarters.q1.labs.lab2.equipment.1'),
            t('translation:quarters.q1.labs.lab2.equipment.2'),
            t('translation:quarters.q1.labs.lab2.equipment.3'),
          ],
          procedure: [
            t('translation:quarters.q1.labs.lab2.procedure.0'),
            t('translation:quarters.q1.labs.lab2.procedure.1'),
            t('translation:quarters.q1.labs.lab2.procedure.2'),
            t('translation:quarters.q1.labs.lab2.procedure.3'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q1.labs.lab2.quiz.q1.question'),
              options: [
                t('translation:quarters.q1.labs.lab2.quiz.q1.options.0'),
                t('translation:quarters.q1.labs.lab2.quiz.q1.options.1'),
                t('translation:quarters.q1.labs.lab2.quiz.q1.options.2'),
                t('translation:quarters.q1.labs.lab2.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab2.quiz.q2.question'),
              options: [
                t('translation:quarters.q1.labs.lab2.quiz.q2.options.0'),
                t('translation:quarters.q1.labs.lab2.quiz.q2.options.1'),
                t('translation:quarters.q1.labs.lab2.quiz.q2.options.2'),
                t('translation:quarters.q1.labs.lab2.quiz.q2.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q1.labs.lab2.quiz.q3.question'),
              options: [
                t('translation:quarters.q1.labs.lab2.quiz.q3.options.0'),
                t('translation:quarters.q1.labs.lab2.quiz.q3.options.1'),
                t('translation:quarters.q1.labs.lab2.quiz.q3.options.2'),
                t('translation:quarters.q1.labs.lab2.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/embed/H_yfQZOzwP4",
              description: t('translation:quarters.q1.labs.lab2.videos.v1'),
            },
            {
              url: "https://www.youtube.com/embed/nhBHhwA5LlI",
              description: t('translation:quarters.q1.labs.lab2.videos.v2'),
            },
          ],
        },
        {
          id: 3,
          title: t('translation:quarters.q1.labs.lab3.title'),
          description: t('translation:quarters.q1.labs.lab3.description'),
          theory: t('translation:quarters.q1.labs.lab3.theory'),
          equipment: [
            t('translation:quarters.q1.labs.lab3.equipment.0'),
            t('translation:quarters.q1.labs.lab3.equipment.1'),
            t('translation:quarters.q1.labs.lab3.equipment.2'),
            t('translation:quarters.q1.labs.lab3.equipment.3'),
            t('translation:quarters.q1.labs.lab3.equipment.4'),
          ],
          procedure: [
            t('translation:quarters.q1.labs.lab3.procedure.0'),
            t('translation:quarters.q1.labs.lab3.procedure.1'),
            t('translation:quarters.q1.labs.lab3.procedure.2'),
            t('translation:quarters.q1.labs.lab3.procedure.3'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q1.labs.lab3.quiz.q1.question'),
              options: [
                t('translation:quarters.q1.labs.lab3.quiz.q1.options.0'),
                t('translation:quarters.q1.labs.lab3.quiz.q1.options.1'),
                t('translation:quarters.q1.labs.lab3.quiz.q1.options.2'),
                t('translation:quarters.q1.labs.lab3.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab3.quiz.q2.question'),
              options: [
                t('translation:quarters.q1.labs.lab3.quiz.q2.options.0'),
                t('translation:quarters.q1.labs.lab3.quiz.q2.options.1'),
                t('translation:quarters.q1.labs.lab3.quiz.q2.options.2'),
                t('translation:quarters.q1.labs.lab3.quiz.q2.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q1.labs.lab3.quiz.q3.question'),
              options: [
                t('translation:quarters.q1.labs.lab3.quiz.q3.options.0'),
                t('translation:quarters.q1.labs.lab3.quiz.q3.options.1'),
                t('translation:quarters.q1.labs.lab3.quiz.q3.options.2'),
                t('translation:quarters.q1.labs.lab3.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab3.quiz.q4.question'),
              options: [
                t('translation:quarters.q1.labs.lab3.quiz.q4.options.0'),
                t('translation:quarters.q1.labs.lab3.quiz.q4.options.1'),
                t('translation:quarters.q1.labs.lab3.quiz.q4.options.2'),
                t('translation:quarters.q1.labs.lab3.quiz.q4.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q1.labs.lab3.quiz.q5.question'),
              options: [
                t('translation:quarters.q1.labs.lab3.quiz.q5.options.0'),
                t('translation:quarters.q1.labs.lab3.quiz.q5.options.1'),
                t('translation:quarters.q1.labs.lab3.quiz.q5.options.2'),
                t('translation:quarters.q1.labs.lab3.quiz.q5.options.3'),
              ],
              correctAnswer: 0,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=IJkLuwt8GWU",
              description: t('translation:quarters.q1.labs.lab3.videos.v1'),
            },
            {
              url: "https://www.youtube.com/watch?v=QsBfhi1I5HQ",
              description: t('translation:quarters.q1.labs.lab3.videos.v2'),
            },
          ],
        },
        {
          id: 4,
          title: t('translation:quarters.q1.labs.lab4.title'),
          description: t('translation:quarters.q1.labs.lab4.description'),
          theory: t('translation:quarters.q1.labs.lab4.theory'),
          equipment: [
            t('translation:quarters.q1.labs.lab4.equipment.0'),
            t('translation:quarters.q1.labs.lab4.equipment.1'),
            t('translation:quarters.q1.labs.lab4.equipment.2'),
            t('translation:quarters.q1.labs.lab4.equipment.3'),
          ],
          procedure: [
            t('translation:quarters.q1.labs.lab4.procedure.0'),
            t('translation:quarters.q1.labs.lab4.procedure.1'),
            t('translation:quarters.q1.labs.lab4.procedure.2'),
            t('translation:quarters.q1.labs.lab4.procedure.3'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q1.labs.lab4.quiz.q1.question'),
              options: [
                t('translation:quarters.q1.labs.lab4.quiz.q1.options.0'),
                t('translation:quarters.q1.labs.lab4.quiz.q1.options.1'),
                t('translation:quarters.q1.labs.lab4.quiz.q1.options.2'),
                t('translation:quarters.q1.labs.lab4.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab4.quiz.q2.question'),
              options: [
                t('translation:quarters.q1.labs.lab4.quiz.q2.options.0'),
                t('translation:quarters.q1.labs.lab4.quiz.q2.options.1'),
                t('translation:quarters.q1.labs.lab4.quiz.q2.options.2'),
                t('translation:quarters.q1.labs.lab4.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab4.quiz.q3.question'),
              options: [
                t('translation:quarters.q1.labs.lab4.quiz.q3.options.0'),
                t('translation:quarters.q1.labs.lab4.quiz.q3.options.1'),
                t('translation:quarters.q1.labs.lab4.quiz.q3.options.2'),
                t('translation:quarters.q1.labs.lab4.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab4.quiz.q4.question'),
              options: [
                t('translation:quarters.q1.labs.lab4.quiz.q4.options.0'),
                t('translation:quarters.q1.labs.lab4.quiz.q4.options.1'),
                t('translation:quarters.q1.labs.lab4.quiz.q4.options.2'),
                t('translation:quarters.q1.labs.lab4.quiz.q4.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q1.labs.lab4.quiz.q5.question'),
              options: [
                t('translation:quarters.q1.labs.lab4.quiz.q5.options.0'),
                t('translation:quarters.q1.labs.lab4.quiz.q5.options.1'),
                t('translation:quarters.q1.labs.lab4.quiz.q5.options.2'),
                t('translation:quarters.q1.labs.lab4.quiz.q5.options.3'),
              ],
              correctAnswer: 1,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=dE0IZGz-tx8",
              description: t('translation:quarters.q1.labs.lab4.videos.v1'),
            },
          ],
        },
        {
          id: 5,
          title: t('translation:quarters.q1.labs.lab5.title'),
          description: t('translation:quarters.q1.labs.lab5.description'),
          theory: t('translation:quarters.q1.labs.lab5.theory'),
          equipment: [
            t('translation:quarters.q1.labs.lab5.equipment.0'),
            t('translation:quarters.q1.labs.lab5.equipment.1'),
            t('translation:quarters.q1.labs.lab5.equipment.2'),
          ],
          procedure: [
            t('translation:quarters.q1.labs.lab5.procedure.0'),
            t('translation:quarters.q1.labs.lab5.procedure.1'),
            t('translation:quarters.q1.labs.lab5.procedure.2'),
            t('translation:quarters.q1.labs.lab5.procedure.3'),
            t('translation:quarters.q1.labs.lab5.procedure.4'),
            t('translation:quarters.q1.labs.lab5.procedure.5'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q1.labs.lab5.quiz.q1.question'),
              options: [
                t('translation:quarters.q1.labs.lab5.quiz.q1.options.0'),
                t('translation:quarters.q1.labs.lab5.quiz.q1.options.1'),
                t('translation:quarters.q1.labs.lab5.quiz.q1.options.2'),
                t('translation:quarters.q1.labs.lab5.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab5.quiz.q2.question'),
              options: [
                t('translation:quarters.q1.labs.lab5.quiz.q2.options.0'),
                t('translation:quarters.q1.labs.lab5.quiz.q2.options.1'),
                t('translation:quarters.q1.labs.lab5.quiz.q2.options.2'),
                t('translation:quarters.q1.labs.lab5.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab5.quiz.q3.question'),
              options: [
                t('translation:quarters.q1.labs.lab5.quiz.q3.options.0'),
                t('translation:quarters.q1.labs.lab5.quiz.q3.options.1'),
                t('translation:quarters.q1.labs.lab5.quiz.q3.options.2'),
                t('translation:quarters.q1.labs.lab5.quiz.q3.options.3'),
              ],
              correctAnswer: 0,
            },
            {
              question: t('translation:quarters.q1.labs.lab5.quiz.q4.question'),
              options: [
                t('translation:quarters.q1.labs.lab5.quiz.q4.options.0'),
                t('translation:quarters.q1.labs.lab5.quiz.q4.options.1'),
                t('translation:quarters.q1.labs.lab5.quiz.q4.options.2'),
                t('translation:quarters.q1.labs.lab5.quiz.q4.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab5.quiz.q5.question'),
              options: [
                t('translation:quarters.q1.labs.lab5.quiz.q5.options.0'),
                t('translation:quarters.q1.labs.lab5.quiz.q5.options.1'),
                t('translation:quarters.q1.labs.lab5.quiz.q5.options.2'),
                t('translation:quarters.q1.labs.lab5.quiz.q5.options.3'),
              ],
              correctAnswer: 1,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=JeajUP6HKhw",
              description: t('translation:quarters.q1.labs.lab5.videos.v1'),
            },
          ],
        },
        {
          id: 6,
          title: t('translation:quarters.q1.labs.lab6.title'),
          description: t('translation:quarters.q1.labs.lab6.description'),
          theory: t('translation:quarters.q1.labs.lab6.theory'),
          equipment: [
            t('translation:quarters.q1.labs.lab6.equipment.0'),
            t('translation:quarters.q1.labs.lab6.equipment.1'),
            t('translation:quarters.q1.labs.lab6.equipment.2'),
            t('translation:quarters.q1.labs.lab6.equipment.3'),
            t('translation:quarters.q1.labs.lab6.equipment.4'),
            t('translation:quarters.q1.labs.lab6.equipment.5'),
            t('translation:quarters.q1.labs.lab6.equipment.6'),
            t('translation:quarters.q1.labs.lab6.equipment.7'),
          ],
          procedure: [
            t('translation:quarters.q1.labs.lab6.procedure.0'),
            t('translation:quarters.q1.labs.lab6.procedure.1'),
            t('translation:quarters.q1.labs.lab6.procedure.2'),
            t('translation:quarters.q1.labs.lab6.procedure.3'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q1.labs.lab6.quiz.q1.question'),
              options: [
                t('translation:quarters.q1.labs.lab6.quiz.q1.options.0'),
                t('translation:quarters.q1.labs.lab6.quiz.q1.options.1'),
                t('translation:quarters.q1.labs.lab6.quiz.q1.options.2'),
                t('translation:quarters.q1.labs.lab6.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab6.quiz.q2.question'),
              options: [
                t('translation:quarters.q1.labs.lab6.quiz.q2.options.0'),
                t('translation:quarters.q1.labs.lab6.quiz.q2.options.1'),
                t('translation:quarters.q1.labs.lab6.quiz.q2.options.2'),
                t('translation:quarters.q1.labs.lab6.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab6.quiz.q3.question'),
              options: [
                t('translation:quarters.q1.labs.lab6.quiz.q3.options.0'),
                t('translation:quarters.q1.labs.lab6.quiz.q3.options.1'),
                t('translation:quarters.q1.labs.lab6.quiz.q3.options.2'),
                t('translation:quarters.q1.labs.lab6.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab6.quiz.q4.question'),
              options: [
                t('translation:quarters.q1.labs.lab6.quiz.q4.options.0'),
                t('translation:quarters.q1.labs.lab6.quiz.q4.options.1'),
                t('translation:quarters.q1.labs.lab6.quiz.q4.options.2'),
                t('translation:quarters.q1.labs.lab6.quiz.q4.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab6.quiz.q5.question'),
              options: [
                t('translation:quarters.q1.labs.lab6.quiz.q5.options.0'),
                t('translation:quarters.q1.labs.lab6.quiz.q5.options.1'),
                t('translation:quarters.q1.labs.lab6.quiz.q5.options.2'),
                t('translation:quarters.q1.labs.lab6.quiz.q5.options.3'),
              ],
              correctAnswer: 2,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=oXhQHTjMrL0",
              description: t('translation:quarters.q1.labs.lab6.videos.v1'),
            },
          ],
        },
        {
          id: 7,
          title: t('translation:quarters.q1.labs.lab7.title'),
          description: t('translation:quarters.q1.labs.lab7.description'),
          theory: t('translation:quarters.q1.labs.lab7.theory'),
          equipment: [
            t('translation:quarters.q1.labs.lab7.equipment.0'),
            t('translation:quarters.q1.labs.lab7.equipment.1'),
            t('translation:quarters.q1.labs.lab7.equipment.2'),
            t('translation:quarters.q1.labs.lab7.equipment.3'),
          ],
          procedure: [
            t('translation:quarters.q1.labs.lab7.procedure.0'),
            t('translation:quarters.q1.labs.lab7.procedure.1'),
            t('translation:quarters.q1.labs.lab7.procedure.2'),
            t('translation:quarters.q1.labs.lab7.procedure.3'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q1.labs.lab7.quiz.q1.question'),
              options: [
                t('translation:quarters.q1.labs.lab7.quiz.q1.options.0'),
                t('translation:quarters.q1.labs.lab7.quiz.q1.options.1'),
                t('translation:quarters.q1.labs.lab7.quiz.q1.options.2'),
                t('translation:quarters.q1.labs.lab7.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab7.quiz.q2.question'),
              options: [
                t('translation:quarters.q1.labs.lab7.quiz.q2.options.0'),
                t('translation:quarters.q1.labs.lab7.quiz.q2.options.1'),
                t('translation:quarters.q1.labs.lab7.quiz.q2.options.2'),
                t('translation:quarters.q1.labs.lab7.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab7.quiz.q3.question'),
              options: [
                t('translation:quarters.q1.labs.lab7.quiz.q3.options.0'),
                t('translation:quarters.q1.labs.lab7.quiz.q3.options.1'),
                t('translation:quarters.q1.labs.lab7.quiz.q3.options.2'),
                t('translation:quarters.q1.labs.lab7.quiz.q3.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q1.labs.lab7.quiz.q4.question'),
              options: [
                t('translation:quarters.q1.labs.lab7.quiz.q4.options.0'),
                t('translation:quarters.q1.labs.lab7.quiz.q4.options.1'),
                t('translation:quarters.q1.labs.lab7.quiz.q4.options.2'),
                t('translation:quarters.q1.labs.lab7.quiz.q4.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q1.labs.lab7.quiz.q5.question'),
              options: [
                t('translation:quarters.q1.labs.lab7.quiz.q5.options.0'),
                t('translation:quarters.q1.labs.lab7.quiz.q5.options.1'),
                t('translation:quarters.q1.labs.lab7.quiz.q5.options.2'),
                t('translation:quarters.q1.labs.lab7.quiz.q5.options.3'),
              ],
              correctAnswer: 1,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=demo_video_url_7",
              description: t('translation:quarters.q1.labs.lab7.videos.v1'),
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: t('translation:quarters.q2.title'),
      labWorks: [
        {
          id: 8,
          title: t('translation:quarters.q2.labs.lab8.title'),
          description: t('translation:quarters.q2.labs.lab8.description'),
          theory: t('translation:quarters.q2.labs.lab8.theory'),
          equipment: [
            t('translation:quarters.q2.labs.lab8.equipment.0'),
            t('translation:quarters.q2.labs.lab8.equipment.1'),
            t('translation:quarters.q2.labs.lab8.equipment.2'),
            t('translation:quarters.q2.labs.lab8.equipment.3'),
            t('translation:quarters.q2.labs.lab8.equipment.4'),
          ],
          procedure: [
            t('translation:quarters.q2.labs.lab8.procedure.0'),
            t('translation:quarters.q2.labs.lab8.procedure.1'),
            t('translation:quarters.q2.labs.lab8.procedure.2'),
            t('translation:quarters.q2.labs.lab8.procedure.3'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q2.labs.lab8.quiz.q1.question'),
              options: [
                t('translation:quarters.q2.labs.lab8.quiz.q1.options.0'),
                t('translation:quarters.q2.labs.lab8.quiz.q1.options.1'),
                t('translation:quarters.q2.labs.lab8.quiz.q1.options.2'),
                t('translation:quarters.q2.labs.lab8.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q2.labs.lab8.quiz.q2.question'),
              options: [
                t('translation:quarters.q2.labs.lab8.quiz.q2.options.0'),
                t('translation:quarters.q2.labs.lab8.quiz.q2.options.1'),
                t('translation:quarters.q2.labs.lab8.quiz.q2.options.2'),
                t('translation:quarters.q2.labs.lab8.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q2.labs.lab8.quiz.q3.question'),
              options: [
                t('translation:quarters.q2.labs.lab8.quiz.q3.options.0'),
                t('translation:quarters.q2.labs.lab8.quiz.q3.options.1'),
                t('translation:quarters.q2.labs.lab8.quiz.q3.options.2'),
                t('translation:quarters.q2.labs.lab8.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q2.labs.lab8.quiz.q4.question'),
              options: [
                t('translation:quarters.q2.labs.lab8.quiz.q4.options.0'),
                t('translation:quarters.q2.labs.lab8.quiz.q4.options.1'),
                t('translation:quarters.q2.labs.lab8.quiz.q4.options.2'),
                t('translation:quarters.q2.labs.lab8.quiz.q4.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q2.labs.lab8.quiz.q5.question'),
              options: [
                t('translation:quarters.q2.labs.lab8.quiz.q5.options.0'),
                t('translation:quarters.q2.labs.lab8.quiz.q5.options.1'),
                t('translation:quarters.q2.labs.lab8.quiz.q5.options.2'),
                t('translation:quarters.q2.labs.lab8.quiz.q5.options.3'),
              ],
              correctAnswer: 1,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=demo_video_url_8",
              description: t('translation:quarters.q2.labs.lab8.videos.v1'),
            },
          ],
        },
        {
          id: 9,
          title: t('translation:quarters.q2.labs.lab9.title'),
          description: t('translation:quarters.q2.labs.lab9.description'),
          theory: t('translation:quarters.q2.labs.lab9.theory'),
          equipment: [
            t('translation:quarters.q2.labs.lab9.equipment.0'),
            t('translation:quarters.q2.labs.lab9.equipment.1'),
            t('translation:quarters.q2.labs.lab9.equipment.2'),
            t('translation:quarters.q2.labs.lab9.equipment.3'),
            t('translation:quarters.q2.labs.lab9.equipment.4'),
          ],
          procedure: [
            t('translation:quarters.q2.labs.lab9.procedure.0'),
            t('translation:quarters.q2.labs.lab9.procedure.1'),
            t('translation:quarters.q2.labs.lab9.procedure.2'),
            t('translation:quarters.q2.labs.lab9.procedure.3'),
            t('translation:quarters.q2.labs.lab9.procedure.4'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q2.labs.lab9.quiz.q1.question'),
              options: [
                t('translation:quarters.q2.labs.lab9.quiz.q1.options.0'),
                t('translation:quarters.q2.labs.lab9.quiz.q1.options.1'),
                t('translation:quarters.q2.labs.lab9.quiz.q1.options.2'),
                t('translation:quarters.q2.labs.lab9.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q2.labs.lab9.quiz.q2.question'),
              options: [
                t('translation:quarters.q2.labs.lab9.quiz.q2.options.0'),
                t('translation:quarters.q2.labs.lab9.quiz.q2.options.1'),
                t('translation:quarters.q2.labs.lab9.quiz.q2.options.2'),
                t('translation:quarters.q2.labs.lab9.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q2.labs.lab9.quiz.q3.question'),
              options: [
                t('translation:quarters.q2.labs.lab9.quiz.q3.options.0'),
                t('translation:quarters.q2.labs.lab9.quiz.q3.options.1'),
                t('translation:quarters.q2.labs.lab9.quiz.q3.options.2'),
                t('translation:quarters.q2.labs.lab9.quiz.q3.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q2.labs.lab9.quiz.q4.question'),
              options: [
                t('translation:quarters.q2.labs.lab9.quiz.q4.options.0'),
                t('translation:quarters.q2.labs.lab9.quiz.q4.options.1'),
                t('translation:quarters.q2.labs.lab9.quiz.q4.options.2'),
                t('translation:quarters.q2.labs.lab9.quiz.q4.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q2.labs.lab9.quiz.q5.question'),
              options: [
                t('translation:quarters.q2.labs.lab9.quiz.q5.options.0'),
                t('translation:quarters.q2.labs.lab9.quiz.q5.options.1'),
                t('translation:quarters.q2.labs.lab9.quiz.q5.options.2'),
                t('translation:quarters.q2.labs.lab9.quiz.q5.options.3'),
              ],
              correctAnswer: 2,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=demo_video_url_9",
              description: t('translation:quarters.q2.labs.lab9.videos.v1'),
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: t('translation:quarters.q3.title'),
      labWorks: [
        {
          id: 10,
          title: t('translation:quarters.q3.labs.lab10.title'),
          description: t('translation:quarters.q3.labs.lab10.description'),
          theory: t('translation:quarters.q3.labs.lab10.theory'),
          equipment: [
            t('translation:quarters.q3.labs.lab10.equipment.0'),
            t('translation:quarters.q3.labs.lab10.equipment.1'),
            t('translation:quarters.q3.labs.lab10.equipment.2'),
            t('translation:quarters.q3.labs.lab10.equipment.3'),
            t('translation:quarters.q3.labs.lab10.equipment.4'),
            t('translation:quarters.q3.labs.lab10.equipment.5'),
            t('translation:quarters.q3.labs.lab10.equipment.6'),
          ],
          procedure: [
            t('translation:quarters.q3.labs.lab10.procedure.0'),
            t('translation:quarters.q3.labs.lab10.procedure.1'),
            t('translation:quarters.q3.labs.lab10.procedure.2'),
            t('translation:quarters.q3.labs.lab10.procedure.3'),
            t('translation:quarters.q3.labs.lab10.procedure.4'),
            t('translation:quarters.q3.labs.lab10.procedure.5'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q3.labs.lab10.quiz.q1.question'),
              options: [
                t('translation:quarters.q3.labs.lab10.quiz.q1.options.0'),
                t('translation:quarters.q3.labs.lab10.quiz.q1.options.1'),
                t('translation:quarters.q3.labs.lab10.quiz.q1.options.2'),
                t('translation:quarters.q3.labs.lab10.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab10.quiz.q2.question'),
              options: [
                t('translation:quarters.q3.labs.lab10.quiz.q2.options.0'),
                t('translation:quarters.q3.labs.lab10.quiz.q2.options.1'),
                t('translation:quarters.q3.labs.lab10.quiz.q2.options.2'),
                t('translation:quarters.q3.labs.lab10.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab10.quiz.q3.question'),
              options: [
                t('translation:quarters.q3.labs.lab10.quiz.q3.options.0'),
                t('translation:quarters.q3.labs.lab10.quiz.q3.options.1'),
                t('translation:quarters.q3.labs.lab10.quiz.q3.options.2'),
                t('translation:quarters.q3.labs.lab10.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab10.quiz.q4.question'),
              options: [
                t('translation:quarters.q3.labs.lab10.quiz.q4.options.0'),
                t('translation:quarters.q3.labs.lab10.quiz.q4.options.1'),
                t('translation:quarters.q3.labs.lab10.quiz.q4.options.2'),
                t('translation:quarters.q3.labs.lab10.quiz.q4.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab10.quiz.q5.question'),
              options: [
                t('translation:quarters.q3.labs.lab10.quiz.q5.options.0'),
                t('translation:quarters.q3.labs.lab10.quiz.q5.options.1'),
                t('translation:quarters.q3.labs.lab10.quiz.q5.options.2'),
                t('translation:quarters.q3.labs.lab10.quiz.q5.options.3'),
              ],
              correctAnswer: 2,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=demo_video_url_10",
              description: t('translation:quarters.q3.labs.lab10.videos.v1'),
            },
          ],
        },
        {
          id: 11,
          title: t('translation:quarters.q3.labs.lab11.title'),
          description: t('translation:quarters.q3.labs.lab11.description'),
          theory: t('translation:quarters.q3.labs.lab11.theory'),
          equipment: [
            t('translation:quarters.q3.labs.lab11.equipment.0'),
            t('translation:quarters.q3.labs.lab11.equipment.1'),
            t('translation:quarters.q3.labs.lab11.equipment.2'),
            t('translation:quarters.q3.labs.lab11.equipment.3'),
          ],
          procedure: [
            t('translation:quarters.q3.labs.lab11.procedure.0'),
            t('translation:quarters.q3.labs.lab11.procedure.1'),
            t('translation:quarters.q3.labs.lab11.procedure.2'),
            t('translation:quarters.q3.labs.lab11.procedure.3'),
            t('translation:quarters.q3.labs.lab11.procedure.4'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q3.labs.lab11.quiz.q1.question'),
              options: [
                t('translation:quarters.q3.labs.lab11.quiz.q1.options.0'),
                t('translation:quarters.q3.labs.lab11.quiz.q1.options.1'),
                t('translation:quarters.q3.labs.lab11.quiz.q1.options.2'),
                t('translation:quarters.q3.labs.lab11.quiz.q1.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q3.labs.lab11.quiz.q2.question'),
              options: [
                t('translation:quarters.q3.labs.lab11.quiz.q2.options.0'),
                t('translation:quarters.q3.labs.lab11.quiz.q2.options.1'),
                t('translation:quarters.q3.labs.lab11.quiz.q2.options.2'),
                t('translation:quarters.q3.labs.lab11.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab11.quiz.q3.question'),
              options: [
                t('translation:quarters.q3.labs.lab11.quiz.q3.options.0'),
                t('translation:quarters.q3.labs.lab11.quiz.q3.options.1'),
                t('translation:quarters.q3.labs.lab11.quiz.q3.options.2'),
                t('translation:quarters.q3.labs.lab11.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab11.quiz.q4.question'),
              options: [
                t('translation:quarters.q3.labs.lab11.quiz.q4.options.0'),
                t('translation:quarters.q3.labs.lab11.quiz.q4.options.1'),
                t('translation:quarters.q3.labs.lab11.quiz.q4.options.2'),
                t('translation:quarters.q3.labs.lab11.quiz.q4.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q3.labs.lab11.quiz.q5.question'),
              options: [
                t('translation:quarters.q3.labs.lab11.quiz.q5.options.0'),
                t('translation:quarters.q3.labs.lab11.quiz.q5.options.1'),
                t('translation:quarters.q3.labs.lab11.quiz.q5.options.2'),
                t('translation:quarters.q3.labs.lab11.quiz.q5.options.3'),
              ],
              correctAnswer: 2,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=demo_video_url_11",
              description: t('translation:quarters.q3.labs.lab11.videos.v1'),
            },
          ],
        },
        {
          id: 12,
          title: t('translation:quarters.q3.labs.lab12.title'),
          description: t('translation:quarters.q3.labs.lab12.description'),
          theory: t('translation:quarters.q3.labs.lab12.theory'),
          equipment: [
            t('translation:quarters.q3.labs.lab12.equipment.0'),
            t('translation:quarters.q3.labs.lab12.equipment.1'),
            t('translation:quarters.q3.labs.lab12.equipment.2'),
            t('translation:quarters.q3.labs.lab12.equipment.3'),
          ],
          procedure: [
            t('translation:quarters.q3.labs.lab12.procedure.0'),
            t('translation:quarters.q3.labs.lab12.procedure.1'),
            t('translation:quarters.q3.labs.lab12.procedure.2'),
            t('translation:quarters.q3.labs.lab12.procedure.3'),
            t('translation:quarters.q3.labs.lab12.procedure.4'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q3.labs.lab12.quiz.q1.question'),
              options: [
                t('translation:quarters.q3.labs.lab12.quiz.q1.options.0'),
                t('translation:quarters.q3.labs.lab12.quiz.q1.options.1'),
                t('translation:quarters.q3.labs.lab12.quiz.q1.options.2'),
                t('translation:quarters.q3.labs.lab12.quiz.q1.options.3'),
              ],
              correctAnswer: 2,
            },
            {
              question: t('translation:quarters.q3.labs.lab12.quiz.q2.question'),
              options: [
                t('translation:quarters.q3.labs.lab12.quiz.q2.options.0'),
                t('translation:quarters.q3.labs.lab12.quiz.q2.options.1'),
                t('translation:quarters.q3.labs.lab12.quiz.q2.options.2'),
                t('translation:quarters.q3.labs.lab12.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab12.quiz.q3.question'),
              options: [
                t('translation:quarters.q3.labs.lab12.quiz.q3.options.0'),
                t('translation:quarters.q3.labs.lab12.quiz.q3.options.1'),
                t('translation:quarters.q3.labs.lab12.quiz.q3.options.2'),
                t('translation:quarters.q3.labs.lab12.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab12.quiz.q4.question'),
              options: [
                t('translation:quarters.q3.labs.lab12.quiz.q4.options.0'),
                t('translation:quarters.q3.labs.lab12.quiz.q4.options.1'),
                t('translation:quarters.q3.labs.lab12.quiz.q4.options.2'),
                t('translation:quarters.q3.labs.lab12.quiz.q4.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab12.quiz.q5.question'),
              options: [
                t('translation:quarters.q3.labs.lab12.quiz.q5.options.0'),
                t('translation:quarters.q3.labs.lab12.quiz.q5.options.1'),
                t('translation:quarters.q3.labs.lab12.quiz.q5.options.2'),
                t('translation:quarters.q3.labs.lab12.quiz.q5.options.3'),
              ],
              correctAnswer: 0,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=demo_video_url_12",
              description: t('translation:quarters.q3.labs.lab12.videos.v1'),
            },
          ],
        },
        {
          id: 13,
          title: t('translation:quarters.q3.labs.lab13.title'),
          description: t('translation:quarters.q3.labs.lab13.description'),
          theory: t('translation:quarters.q3.labs.lab13.theory'),
          equipment: [
            t('translation:quarters.q3.labs.lab13.equipment.0'),
            t('translation:quarters.q3.labs.lab13.equipment.1'),
            t('translation:quarters.q3.labs.lab13.equipment.2'),
            t('translation:quarters.q3.labs.lab13.equipment.3'),
            t('translation:quarters.q3.labs.lab13.equipment.4'),
            t('translation:quarters.q3.labs.lab13.equipment.5'),
            t('translation:quarters.q3.labs.lab13.equipment.6'),
          ],
          procedure: [
            t('translation:quarters.q3.labs.lab13.procedure.0'),
            t('translation:quarters.q3.labs.lab13.procedure.1'),
            t('translation:quarters.q3.labs.lab13.procedure.2'),
            t('translation:quarters.q3.labs.lab13.procedure.3'),
            t('translation:quarters.q3.labs.lab13.procedure.4'),
            t('translation:quarters.q3.labs.lab13.procedure.5'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q3.labs.lab13.quiz.q1.question'),
              options: [
                t('translation:quarters.q3.labs.lab13.quiz.q1.options.0'),
                t('translation:quarters.q3.labs.lab13.quiz.q1.options.1'),
                t('translation:quarters.q3.labs.lab13.quiz.q1.options.2'),
                t('translation:quarters.q3.labs.lab13.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab13.quiz.q2.question'),
              options: [
                t('translation:quarters.q3.labs.lab13.quiz.q2.options.0'),
                t('translation:quarters.q3.labs.lab13.quiz.q2.options.1'),
                t('translation:quarters.q3.labs.lab13.quiz.q2.options.2'),
                t('translation:quarters.q3.labs.lab13.quiz.q2.options.3'),
              ],
              correctAnswer: 0,
            },
            {
              question: t('translation:quarters.q3.labs.lab13.quiz.q3.question'),
              options: [
                t('translation:quarters.q3.labs.lab13.quiz.q3.options.0'),
                t('translation:quarters.q3.labs.lab13.quiz.q3.options.1'),
                t('translation:quarters.q3.labs.lab13.quiz.q3.options.2'),
                t('translation:quarters.q3.labs.lab13.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab13.quiz.q4.question'),
              options: [
                t('translation:quarters.q3.labs.lab13.quiz.q4.options.0'),
                t('translation:quarters.q3.labs.lab13.quiz.q4.options.1'),
                t('translation:quarters.q3.labs.lab13.quiz.q4.options.2'),
                t('translation:quarters.q3.labs.lab13.quiz.q4.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab13.quiz.q5.question'),
              options: [
                t('translation:quarters.q3.labs.lab13.quiz.q5.options.0'),
                t('translation:quarters.q3.labs.lab13.quiz.q5.options.1'),
                t('translation:quarters.q3.labs.lab13.quiz.q5.options.2'),
                t('translation:quarters.q3.labs.lab13.quiz.q5.options.3'),
              ],
              correctAnswer: 1,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=i0udn8oESsI",
              description: t('translation:quarters.q3.labs.lab13.videos.v1'),
            },
          ],
        },
        {
          id: 14,
          title: t('translation:quarters.q3.labs.lab14.title'),
          description: t('translation:quarters.q3.labs.lab14.description'),
          theory: t('translation:quarters.q3.labs.lab14.theory'),
          equipment: [
            t('translation:quarters.q3.labs.lab14.equipment.0'),
            t('translation:quarters.q3.labs.lab14.equipment.1'),
            t('translation:quarters.q3.labs.lab14.equipment.2'),
            t('translation:quarters.q3.labs.lab14.equipment.3'),
            t('translation:quarters.q3.labs.lab14.equipment.4'),
            t('translation:quarters.q3.labs.lab14.equipment.5'),
          ],
          procedure: [
            t('translation:quarters.q3.labs.lab14.procedure.0'),
            t('translation:quarters.q3.labs.lab14.procedure.1'),
            t('translation:quarters.q3.labs.lab14.procedure.2'),
            t('translation:quarters.q3.labs.lab14.procedure.3'),
            t('translation:quarters.q3.labs.lab14.procedure.4'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q3.labs.lab14.quiz.q1.question'),
              options: [
                t('translation:quarters.q3.labs.lab14.quiz.q1.options.0'),
                t('translation:quarters.q3.labs.lab14.quiz.q1.options.1'),
                t('translation:quarters.q3.labs.lab14.quiz.q1.options.2'),
                t('translation:quarters.q3.labs.lab14.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab14.quiz.q2.question'),
              options: [
                t('translation:quarters.q3.labs.lab14.quiz.q2.options.0'),
                t('translation:quarters.q3.labs.lab14.quiz.q2.options.1'),
                t('translation:quarters.q3.labs.lab14.quiz.q2.options.2'),
                t('translation:quarters.q3.labs.lab14.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab14.quiz.q3.question'),
              options: [
                t('translation:quarters.q3.labs.lab14.quiz.q3.options.0'),
                t('translation:quarters.q3.labs.lab14.quiz.q3.options.1'),
                t('translation:quarters.q3.labs.lab14.quiz.q3.options.2'),
                t('translation:quarters.q3.labs.lab14.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab14.quiz.q4.question'),
              options: [
                t('translation:quarters.q3.labs.lab14.quiz.q4.options.0'),
                t('translation:quarters.q3.labs.lab14.quiz.q4.options.1'),
                t('translation:quarters.q3.labs.lab14.quiz.q4.options.2'),
                t('translation:quarters.q3.labs.lab14.quiz.q4.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab14.quiz.q5.question'),
              options: [
                t('translation:quarters.q3.labs.lab14.quiz.q5.options.0'),
                t('translation:quarters.q3.labs.lab14.quiz.q5.options.1'),
                t('translation:quarters.q3.labs.lab14.quiz.q5.options.2'),
                t('translation:quarters.q3.labs.lab14.quiz.q5.options.3'),
              ],
              correctAnswer: 2,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=8E3-RT5xhcs",
              description: t('translation:quarters.q3.labs.lab14.videos.v1'),
            },
          ],
        },
        {
          id: 15,
          title: t('translation:quarters.q3.labs.lab15.title'),
          description: t('translation:quarters.q3.labs.lab15.description'),
          theory: t('translation:quarters.q3.labs.lab15.theory'),
          equipment: [
            t('translation:quarters.q3.labs.lab15.equipment.0'),
            t('translation:quarters.q3.labs.lab15.equipment.1'),
            t('translation:quarters.q3.labs.lab15.equipment.2'),
            t('translation:quarters.q3.labs.lab15.equipment.3'),
            t('translation:quarters.q3.labs.lab15.equipment.4'),
            t('translation:quarters.q3.labs.lab15.equipment.5'),
          ],
          procedure: [
            t('translation:quarters.q3.labs.lab15.procedure.0'),
            t('translation:quarters.q3.labs.lab15.procedure.1'),
            t('translation:quarters.q3.labs.lab15.procedure.2'),
            t('translation:quarters.q3.labs.lab15.procedure.3'),
            t('translation:quarters.q3.labs.lab15.procedure.4'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q3.labs.lab15.quiz.q1.question'),
              options: [
                t('translation:quarters.q3.labs.lab15.quiz.q1.options.0'),
                t('translation:quarters.q3.labs.lab15.quiz.q1.options.1'),
                t('translation:quarters.q3.labs.lab15.quiz.q1.options.2'),
                t('translation:quarters.q3.labs.lab15.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab15.quiz.q2.question'),
              options: [
                t('translation:quarters.q3.labs.lab15.quiz.q2.options.0'),
                t('translation:quarters.q3.labs.lab15.quiz.q2.options.1'),
                t('translation:quarters.q3.labs.lab15.quiz.q2.options.2'),
                t('translation:quarters.q3.labs.lab15.quiz.q2.options.3'),
              ],
              correctAnswer: 0,
            },
            {
              question: t('translation:quarters.q3.labs.lab15.quiz.q3.question'),
              options: [
                t('translation:quarters.q3.labs.lab15.quiz.q3.options.0'),
                t('translation:quarters.q3.labs.lab15.quiz.q3.options.1'),
                t('translation:quarters.q3.labs.lab15.quiz.q3.options.2'),
                t('translation:quarters.q3.labs.lab15.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab15.quiz.q4.question'),
              options: [
                t('translation:quarters.q3.labs.lab15.quiz.q4.options.0'),
                t('translation:quarters.q3.labs.lab15.quiz.q4.options.1'),
                t('translation:quarters.q3.labs.lab15.quiz.q4.options.2'),
                t('translation:quarters.q3.labs.lab15.quiz.q4.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q3.labs.lab15.quiz.q5.question'),
              options: [
                t('translation:quarters.q3.labs.lab15.quiz.q5.options.0'),
                t('translation:quarters.q3.labs.lab15.quiz.q5.options.1'),
                t('translation:quarters.q3.labs.lab15.quiz.q5.options.2'),
                t('translation:quarters.q3.labs.lab15.quiz.q5.options.3'),
              ],
              correctAnswer: 1,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=DX6b6Mh9zmY",
              description: t('translation:quarters.q3.labs.lab15.videos.v1'),
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: t('translation:quarters.q4.title'),
      labWorks: [
        {
          id: 16,
          title: t('translation:quarters.q4.labs.lab16.title'),
          description: t('translation:quarters.q4.labs.lab16.description'),
          theory: t('translation:quarters.q4.labs.lab16.theory'),
          equipment: [
            t('translation:quarters.q4.labs.lab16.equipment.0'),
            t('translation:quarters.q4.labs.lab16.equipment.1'),
            t('translation:quarters.q4.labs.lab16.equipment.2'),
            t('translation:quarters.q4.labs.lab16.equipment.3'),
            t('translation:quarters.q4.labs.lab16.equipment.4'),
            t('translation:quarters.q4.labs.lab16.equipment.5'),
          ],
          procedure: [
            t('translation:quarters.q4.labs.lab16.procedure.0'),
            t('translation:quarters.q4.labs.lab16.procedure.1'),
            t('translation:quarters.q4.labs.lab16.procedure.2'),
            t('translation:quarters.q4.labs.lab16.procedure.3'),
            t('translation:quarters.q4.labs.lab16.procedure.4'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q4.labs.lab16.quiz.q1.question'),
              options: [
                t('translation:quarters.q4.labs.lab16.quiz.q1.options.0'),
                t('translation:quarters.q4.labs.lab16.quiz.q1.options.1'),
                t('translation:quarters.q4.labs.lab16.quiz.q1.options.2'),
                t('translation:quarters.q4.labs.lab16.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q4.labs.lab16.quiz.q2.question'),
              options: [
                t('translation:quarters.q4.labs.lab16.quiz.q2.options.0'),
                t('translation:quarters.q4.labs.lab16.quiz.q2.options.1'),
                t('translation:quarters.q4.labs.lab16.quiz.q2.options.2'),
                t('translation:quarters.q4.labs.lab16.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q4.labs.lab16.quiz.q3.question'),
              options: [
                t('translation:quarters.q4.labs.lab16.quiz.q3.options.0'),
                t('translation:quarters.q4.labs.lab16.quiz.q3.options.1'),
                t('translation:quarters.q4.labs.lab16.quiz.q3.options.2'),
                t('translation:quarters.q4.labs.lab16.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q4.labs.lab16.quiz.q4.question'),
              options: [
                t('translation:quarters.q4.labs.lab16.quiz.q4.options.0'),
                t('translation:quarters.q4.labs.lab16.quiz.q4.options.1'),
                t('translation:quarters.q4.labs.lab16.quiz.q4.options.2'),
                t('translation:quarters.q4.labs.lab16.quiz.q4.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q4.labs.lab16.quiz.q5.question'),
              options: [
                t('translation:quarters.q4.labs.lab16.quiz.q5.options.0'),
                t('translation:quarters.q4.labs.lab16.quiz.q5.options.1'),
                t('translation:quarters.q4.labs.lab16.quiz.q5.options.2'),
                t('translation:quarters.q4.labs.lab16.quiz.q5.options.3'),
              ],
              correctAnswer: 1,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=demo_video_url_16",
              description: t('translation:quarters.q4.labs.lab16.videos.v1'),
            },
          ],
        },
        {
          id: 17,
          title: t('translation:quarters.q4.labs.lab17.title'),
          description: t('translation:quarters.q4.labs.lab17.description'),
          theory: t('translation:quarters.q4.labs.lab17.theory'),
          equipment: [
            t('translation:quarters.q4.labs.lab17.equipment.0'),
            t('translation:quarters.q4.labs.lab17.equipment.1'),
            t('translation:quarters.q4.labs.lab17.equipment.2'),
            t('translation:quarters.q4.labs.lab17.equipment.3'),
            t('translation:quarters.q4.labs.lab17.equipment.4'),
            t('translation:quarters.q4.labs.lab17.equipment.5'),
            t('translation:quarters.q4.labs.lab17.equipment.6'),
          ],
          procedure: [
            t('translation:quarters.q4.labs.lab17.procedure.0'),
            t('translation:quarters.q4.labs.lab17.procedure.1'),
            t('translation:quarters.q4.labs.lab17.procedure.2'),
            t('translation:quarters.q4.labs.lab17.procedure.3'),
            t('translation:quarters.q4.labs.lab17.procedure.4'),
            t('translation:quarters.q4.labs.lab17.procedure.5'),
          ],
          quiz: [
            {
              question: t('translation:quarters.q4.labs.lab17.quiz.q1.question'),
              options: [
                t('translation:quarters.q4.labs.lab17.quiz.q1.options.0'),
                t('translation:quarters.q4.labs.lab17.quiz.q1.options.1'),
                t('translation:quarters.q4.labs.lab17.quiz.q1.options.2'),
                t('translation:quarters.q4.labs.lab17.quiz.q1.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q4.labs.lab17.quiz.q2.question'),
              options: [
                t('translation:quarters.q4.labs.lab17.quiz.q2.options.0'),
                t('translation:quarters.q4.labs.lab17.quiz.q2.options.1'),
                t('translation:quarters.q4.labs.lab17.quiz.q2.options.2'),
                t('translation:quarters.q4.labs.lab17.quiz.q2.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q4.labs.lab17.quiz.q3.question'),
              options: [
                t('translation:quarters.q4.labs.lab17.quiz.q3.options.0'),
                t('translation:quarters.q4.labs.lab17.quiz.q3.options.1'),
                t('translation:quarters.q4.labs.lab17.quiz.q3.options.2'),
                t('translation:quarters.q4.labs.lab17.quiz.q3.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q4.labs.lab17.quiz.q4.question'),
              options: [
                t('translation:quarters.q4.labs.lab17.quiz.q4.options.0'),
                t('translation:quarters.q4.labs.lab17.quiz.q4.options.1'),
                t('translation:quarters.q4.labs.lab17.quiz.q4.options.2'),
                t('translation:quarters.q4.labs.lab17.quiz.q4.options.3'),
              ],
              correctAnswer: 1,
            },
            {
              question: t('translation:quarters.q4.labs.lab17.quiz.q5.question'),
              options: [
                t('translation:quarters.q4.labs.lab17.quiz.q5.options.0'),
                t('translation:quarters.q4.labs.lab17.quiz.q5.options.1'),
                t('translation:quarters.q4.labs.lab17.quiz.q5.options.2'),
                t('translation:quarters.q4.labs.lab17.quiz.q5.options.3'),
              ],
              correctAnswer: 1,
            },
          ],
          videos: [
            {
              url: "https://www.youtube.com/watch?v=Yl1irgDEIs0",
              description: t('translation:quarters.q4.labs.lab17.videos.v1'),
            },
          ],
        },
      ],
    },
  ];
};