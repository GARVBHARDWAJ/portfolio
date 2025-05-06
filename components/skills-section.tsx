"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SkillsSection() {
  const skills = {
    languages: ["Python", "Java", "C", "C++", "HTML", "CSS", "JavaScript", "SQL"],
    frameworks: ["ReactJS", "NodeJS", "Flutter", "MongoDB", "Git", "VS Code", "Google Cloud", "Linux"],
    concepts: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Artificial Intelligence",
      "Machine Learning",
      "PostgreSQL",
    ],
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  const staggerBadges = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const badgeAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  }

  return (
    <Tabs defaultValue="languages" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="languages" className="interactive">
          Languages
        </TabsTrigger>
        <TabsTrigger value="frameworks" className="interactive">
          Frameworks & Tools
        </TabsTrigger>
        <TabsTrigger value="concepts" className="interactive">
          Core Concepts
        </TabsTrigger>
      </TabsList>
      <TabsContent value="languages" className="mt-6">
        <Card className="card-hover">
          <CardContent className="pt-6">
            <motion.div variants={staggerBadges} initial="hidden" animate="visible" className="flex flex-wrap gap-3">
              {skills.languages.map((skill) => (
                <motion.div key={skill} variants={badgeAnimation}>
                  <Badge className="px-3 py-1 text-base interactive">{skill}</Badge>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="frameworks" className="mt-6">
        <Card className="card-hover">
          <CardContent className="pt-6">
            <motion.div variants={staggerBadges} initial="hidden" animate="visible" className="flex flex-wrap gap-3">
              {skills.frameworks.map((skill) => (
                <motion.div key={skill} variants={badgeAnimation}>
                  <Badge className="px-3 py-1 text-base interactive">{skill}</Badge>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="concepts" className="mt-6">
        <Card className="card-hover">
          <CardContent className="pt-6">
            <motion.div variants={staggerBadges} initial="hidden" animate="visible" className="flex flex-wrap gap-3">
              {skills.concepts.map((skill) => (
                <motion.div key={skill} variants={badgeAnimation}>
                  <Badge className="px-3 py-1 text-base interactive">{skill}</Badge>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
