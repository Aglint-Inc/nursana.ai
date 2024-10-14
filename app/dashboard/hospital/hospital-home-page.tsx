"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";

export default function HospitalHomePage() {
  const [openPositions, setOpenPositions] = useState([
    "Pediatric Nurse",
    "Critical Care Nurse",
    "Registered Nurse",
  ]);
  const [departments, setDepartments] = useState([
    "Emergency",
    "Pediatrics",
    "Surgery",
  ]);

  const removePosition = (position: string) => {
    setOpenPositions(openPositions.filter((p) => p !== position));
  };

  const removeDepartment = (department: string) => {
    setDepartments(departments.filter((d) => d !== department));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Hospital Dashboard</h1>
          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">
                Recent Applications
              </h2>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  {/* List of all applications */}
                  <p>All applications will be listed here.</p>
                </TabsContent>
                <TabsContent value="new">
                  {/* List of new applications */}
                  <p>New applications will be listed here.</p>
                </TabsContent>
                <TabsContent value="reviewed">
                  {/* List of reviewed applications */}
                  <p>Reviewed applications will be listed here.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">
                Hospital Statistics
              </h2>
              {/* Add hospital statistics here */}
              <p>Hospital statistics and charts will be displayed here.</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Manage Job Listings
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Update your open positions and department information.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Open Positions
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {openPositions.map((position, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center"
                      >
                        {position}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0"
                          onClick={() => removePosition(position)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Add new position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="surgeon">Surgeon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Departments
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {departments.map((department, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center"
                      >
                        {department}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0"
                          onClick={() => removeDepartment(department)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Add new department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="oncology">Oncology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Hospital Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hospital type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Hospital</SelectItem>
                      <SelectItem value="specialized">
                        Specialized Hospital
                      </SelectItem>
                      <SelectItem value="teaching">
                        Teaching Hospital
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Beds
                  </label>
                  <Input type="number" placeholder="e.g., 500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
