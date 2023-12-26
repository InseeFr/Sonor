import React from 'react';
import { DatesTable } from "./Dates";
import { render, screen } from '@testing-library/react';

describe("dates component", () => {
    it("should display all labels", () => {
        render(
            <DatesTable
                identificationPhaseStartDate={1578907245000}
                collectionstartDate={1609492845000}
                collectionEndDate={1698706800000}
                endDate={1706655600000}
              />
            
          );

        expect(screen.getByText("Dates")).toBeInTheDocument();
        expect(screen.getByText("Start of identification phase")).toBeInTheDocument();
        expect(screen.getByText("Collection start date")).toBeInTheDocument();
        expect(screen.getByText("Collection end date")).toBeInTheDocument();
        expect(screen.getByText("Processing end date")).toBeInTheDocument();
        
    })

    it("should display all formated dates", () => {
        render(
            <DatesTable
                identificationPhaseStartDate={1578907245000}
                collectionstartDate={1609492845000}
                collectionEndDate={1698706800000}
                endDate={1706655600000}
              />
            
          );

        expect(screen.getByText("13/01/2020")).toBeInTheDocument();
        expect(screen.getByText("01/01/2021")).toBeInTheDocument();
        expect(screen.getByText("31/10/2023")).toBeInTheDocument();
        expect(screen.getByText("31/01/2024")).toBeInTheDocument();
    })
})