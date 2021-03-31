import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.css'],
})
export class EditquestionComponent implements OnInit {
  @Input() id: number;
  @Output() close = new EventEmitter();
  @Output() editted = new EventEmitter();
  questionValue = '';
  titleValue = '';
  questionId: number;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.showQuestion(this.id).subscribe((responseData) => {
      this.questionValue = responseData.question;
      this.titleValue = responseData.title;
      this.questionId = responseData.id;
    });
  }

  onClose() {
    this.close.emit();
  }

  onEditQuestionSubmit(data: { title: string; question: string; }) {
    this.dataService
      .editQuestion(this.questionId, data.title, data.question)
      .subscribe((_response) => {
        this.editted.emit();
      });
  }
}