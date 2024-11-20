import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent implements OnInit {

  invoiceForm!: FormGroup;
  showPreview = false;
  isLoading = false;
  selectedTemplateId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedTemplateId = params['templateId'];
    });
  }

  private createForm() {
    this.invoiceForm = this.fb.group({
      signatureName: ['', Validators.required],
      signatureDate: [new Date(), Validators.required],
      invoiceNumber: ['', Validators.required],
      issueDate: [new Date(), Validators.required],
      dueDate: ['', Validators.required],
      company: this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required]
      }),
      client: this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required]
      }),
      items: this.fb.array([]),
      notes: [''],
      terms: [''],
      subtotal: [0],
      tax: [0],
      total: [0]
    });

    // Add first item by default
    this.addItem();
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    const itemGroup = this.fb.group({
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      amount: [{ value: 0, disabled: true }]
    });

    itemGroup.valueChanges.subscribe(() => this.calculateTotals());
    this.items.push(itemGroup);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotals();
  }

  calculateTotals() {
    const items = this.items.getRawValue();
    const subtotal = items.reduce((sum, item) => {
      const amount = item.quantity * item.price;
      this.items.at(items.indexOf(item)).patchValue({ amount }, { emitEvent: false });
      return sum + amount;
    }, 0);

    const tax = subtotal * 0.1; // 10% tax example
    const total = subtotal + tax;

    this.invoiceForm.patchValue({
      subtotal,
      tax,
      total
    }, { emitEvent: false });
  }

  togglePreview() {
    this.showPreview = !this.showPreview;
  }

  async saveInvoice() {
    if (this.invoiceForm.valid) {
      this.isLoading = true;
      try {
        // Add your save logic here
        console.log('Invoice Data:', {
          ...this.invoiceForm.value,
          templateId: this.selectedTemplateId
        });
        await this.mockSaveDelay();
        this.router.navigate(['/invoices']);
      } catch (error) {
        console.error('Error saving invoice:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      this.markFormGroupTouched(this.invoiceForm);
    }
  }

  printInvoice(){

  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Mock delay for save operation
  private mockSaveDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  goBack() {
    this.router.navigate(['/templates']);
  }




  // @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  // signatureType: 'draw' | 'upload' = 'draw';
  // isDrawing = false;
  // context: CanvasRenderingContext2D | null = null;
  // signatureImage: string | null = null;
  // isDragging = false;
  // currentDate = new Date();


  



  // ngAfterViewInit() {
  //   this.initializeCanvas();
  // }

  //   startDrawing(event: MouseEvent) {
  //     this.isDrawing = true;
  //     const { x, y } = this.getCoordinates(event);
  //     this.context?.beginPath();
  //     this.context?.moveTo(x, y);
  //   }

  //   draw(event: MouseEvent) {
  //     if (!this.isDrawing) return;
  //     const { x, y } = this.getCoordinates(event);
  //     this.context?.lineTo(x, y);
  //     this.context?.stroke();
  //   }


  //   private getCoordinates(event: MouseEvent): { x: number; y: number } {
  //     const canvas = this.signatureCanvas.nativeElement;
  //     const rect = canvas.getBoundingClientRect();
  //     const scaleX = canvas.width / rect.width;
  //     const scaleY = canvas.height / rect.height;
      
  //     return {
  //       x: (event.clientX - rect.left) * scaleX,
  //       y: (event.clientY - rect.top) * scaleY
  //     };
  //   }

  //   switchSignatureType(type: 'draw' | 'upload') {
  //     this.signatureType = type;
  //     if (type === 'draw') {
  //       // Reinitialize canvas on next tick after view updates
  //       setTimeout(() => {
  //         this.initializeCanvas();
  //       });
  //     }
  //   }

  //   private initializeCanvas() {
  //     if (this.signatureCanvas) {
  //       const canvas = this.signatureCanvas.nativeElement;
  //       canvas.width = canvas.offsetWidth;
  //       canvas.height = canvas.offsetHeight;
        
  //       this.context = canvas.getContext('2d');
  //       if (this.context) {
  //         this.context.strokeStyle = '#000';
  //         this.context.lineWidth = 2;
  //         this.context.lineCap = 'round';
  //         this.context.lineJoin = 'round';
  //       }
  //     }
  //   }

  // stopDrawing() {
  //   this.isDrawing = false;
  // }

  // clearSignature() {
  //   if (this.context) {
  //     this.context.clearRect(
  //       0, 
  //       0, 
  //       this.signatureCanvas.nativeElement.width, 
  //       this.signatureCanvas.nativeElement.height
  //     );
  //   }
  // }

  // onDragOver(event: DragEvent) {
  //   event.preventDefault();
  //   this.isDragging = true;
  // }

  // onDragLeave(event: DragEvent) {
  //   event.preventDefault();
  //   this.isDragging = false;
  // }

  // onDrop(event: DragEvent) {
  //   event.preventDefault();
  //   this.isDragging = false;
  //   const files = event.dataTransfer?.files;
  //   if (files) {
  //     this.handleFile(files[0]);
  //   }
  // }

  // onFileSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     this.handleFile(file);
  //   }
  // }

  // private handleFile(file: File) {
  //   if (file.type.startsWith('image/')) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       this.signatureImage = e.target?.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // removeSignature() {
  //   this.signatureImage = null;
  // }

  // // Add to your save method
  // getSignatureData(): string {
  //   if (this.signatureType === 'draw') {
  //     return this.signatureCanvas.nativeElement.toDataURL();
  //   }
  //   return this.signatureImage || '';
  // }

}



