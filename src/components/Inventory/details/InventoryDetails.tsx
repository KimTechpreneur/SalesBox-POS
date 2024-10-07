'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Plus, Minus, RotateCcw } from "lucide-react"

type InventoryItem = {
  id: string
  name: string
  sku: string
  description: string
  category: string
  quantity: number
  unitPrice: number
  totalValue: number
  supplier: string
  lastUpdated: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

const mockInventoryItem: InventoryItem = {
  id: '1',
  name: 'Wireless Bluetooth Headphones',
  sku: 'SKU001',
  description: 'High-quality wireless headphones with noise-cancelling technology',
  category: 'Electronics',
  quantity: 100,
  unitPrice: 79.99,
  totalValue: 7999,
  supplier: 'TechAudio Inc.',
  lastUpdated: '2023-06-15',
  status: 'In Stock'
}

export function InventoryDetails() {
  const [item, setItem] = useState<InventoryItem>(mockInventoryItem)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setItem(prevItem => ({ ...prevItem, [name]: value }))
  }

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving item:', item)
  }

  const handleStockAdjustment = (adjustment: number) => {
    setItem(prevItem => ({
      ...prevItem,
      quantity: prevItem.quantity + adjustment,
      totalValue: (prevItem.quantity + adjustment) * prevItem.unitPrice
    }))
  }

  return (
    <div className="container mx-auto py-10">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Inventory List
      </Button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory Item Details</h1>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="stock">Stock Movements</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Item Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" name="sku" value={item.sku} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={item.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={item.category} onValueChange={(value) => setItem(prevItem => ({ ...prevItem, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input id="supplier" name="supplier" value={item.supplier} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Unit Price (XAF)</Label>
                  <Input id="unitPrice" name="unitPrice" type="number" value={item.unitPrice} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="quantity" name="quantity" type="number" value={item.quantity} onChange={handleInputChange} />
                    <Button size="sm" onClick={() => handleStockAdjustment(1)}><Plus className="h-4 w-4" /></Button>
                    <Button size="sm" onClick={() => handleStockAdjustment(-1)}><Minus className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={item.description} onChange={handleInputChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stock">
          <Card>
            <CardHeader>
              <CardTitle>Stock Movements</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Add stock movement data here */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}