"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

const formulaireEvaluationOffreSchema = z.object({
  criteria: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      status: z.enum(["conforme", "non-conforme", "a-verifier"], {
        required_error: "Vous devez sélectionner un statut.",
      }),
      note: z.number().min(0).max(100).optional(),
      comment: z.string().optional(),
    })
  ),
  globalComment: z.string().optional(),
})

type FormulaireEvaluationOffreValues = z.infer<typeof formulaireEvaluationOffreSchema>

// Mock data for criteria, to be replaced by props
const criteriaList = [
  { id: "crit-1", name: "Complétude du dossier administratif" },
  { id: "crit-2", name: "Références techniques pour des projets similaires" },
  { id: "crit-3", name: "Capacité financière de l'entreprise" },
  { id: "crit-4", name: "Méthodologie proposée" },
];

const defaultValues: Partial<FormulaireEvaluationOffreValues> = {
  criteria: criteriaList.map(c => ({
    id: c.id,
    name: c.name,
    status: undefined,
    note: undefined,
    comment: "",
  })),
  globalComment: "",
};


export function FormulaireEvaluationOffre() {
  const form = useForm<FormulaireEvaluationOffreValues>({
    resolver: zodResolver(formulaireEvaluationOffreSchema),
    defaultValues,
  })

  function onSubmit(data: FormulaireEvaluationOffreValues) {
    console.log(data)
    // Here you would typically send the data to your server
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Grille d'Évaluation de l'Offre</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {form.getValues("criteria").map((criterion, index) => (
                        <FormField
                            key={criterion.id}
                            control={form.control}
                            name={`criteria.${index}.status`}
                            render={({ field }) => (
                                <FormItem className="space-y-3 p-4 border rounded-md">
                                    <FormLabel className="font-semibold">{criterion.name}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                <RadioGroupItem value="conforme" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                Conforme
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                <RadioGroupItem value="non-conforme" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                Non conforme
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                <RadioGroupItem value="a-verifier" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                À vérifier
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />

                                    {/* Optional Note and Comment */}
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <FormField
                                            control={form.control}
                                            name={`criteria.${index}.note`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Note (optionnel)</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="ex: 85" {...field} onChange={event => field.onChange(+event.target.value)} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                         <FormField
                                            control={form.control}
                                            name={`criteria.${index}.comment`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Avis / Commentaire</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Ajouter un commentaire..." {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                </FormItem>
                            )}
                        />
                    ))}

                    <FormField
                        control={form.control}
                        name="globalComment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">Commentaire Général</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Ajoutez un commentaire global sur l'offre..."
                                    className="resize-y"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Ce commentaire apparaîtra dans le rapport de synthèse.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Enregistrer l'évaluation</Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}
