import { format } from "date-fns"
import React from "react"
import { DateRange } from "react-day-picker"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./calendar"
import { es } from "date-fns/locale"

export function DatePickerWithRange({date, setDate}: {date: DateRange, setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>}) {
    return (
      <div className={cn("grid gap-2")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-fit justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y", {locale: es})} -{" "}
                    {format(date.to, "LLL dd, y", {locale: es})}
                  </>
                ) : (
                  format(date.from, "LLL dd, y", {locale: es})
                )
              ) : (
                <span>Selecciona un período</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              locale={es}
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }