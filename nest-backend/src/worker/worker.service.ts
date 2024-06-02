import { Injectable, NotFoundException, ParseIntPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkersEntity } from "./worker.entity";
import { Like, Repository } from "typeorm";
import { WorkerDTO, loginDTO, updateWorkerDTO } from "./dto/worker.dto";
import { JwtService } from "@nestjs/jwt";
import { ServiceEntity } from "src/service/services.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { ReviewEntity } from "src/review/review.entity";
import { OrderEntity } from "src/order/order.entity";
import { WorkerInfoEntity } from "./workerInfo.entity";
import { WorkerRegistrationDTO } from "./dto/workerRegistration.dto";
import { worker_workerInfDto } from "./dto/worker_workerInf.dto";
//import { WorkeRegistrationDTO } from "./dto/workerRegistration.dto";




@Injectable()
export class WorkersService {

    constructor(@InjectRepository(WorkersEntity) 
    private workerRepository: Repository<WorkersEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(WorkerInfoEntity)
    private workerInfoRepository: Repository<WorkerInfoEntity>,

    private mailerService: MailerService,
    private jwtService : JwtService) {}

    
    getUsers(): object {
        return {message: 'Hello Workers'};  
    }

    // async createWorker(workersEntity: Partial<WorkersEntity>): Promise<WorkersEntity>
    // {
    //     return await this.workerRepository.save(workersEntity);
    // }

    // async getWorkerBySubstring (substring: string): Promise<WorkersEntity[]>
    // {
    //   return this.workerRepository.find({ where: { fullName: Like(`%${substring}%`) } });     }

    // async findByUsername(username: string): Promise<WorkersEntity> 
    // {
    //     return this.workerRepository.findOne({where : {username} });
    // }

    // async removeByUsername(username:string): Promise<string> 
    // {
    //   const result =  await this.workerRepository.delete({ username });

    //   if (result.affected === 0) {
    //     throw new NotFoundException(`Worker with Username ${username} not Found`);
    //   } else {
    //     return 'Worker profile deleted successfully';
    //   } 
    // } 

    async createWorker(
      workerDTO: WorkerRegistrationDTO
      ): Promise<WorkersEntity> {
        //const worker = new WorkersEntity();
       // workerDTO.hourlyRate = Number(workerDTO.hourlyRate);
       //workerDTO.hourlyRate = parseInt(workerDTO.hourlyRate, 10);

       const worker = new WorkersEntity();
        worker.name = workerDTO.name;
        worker.profilePicture = workerDTO.profilePicture;
        worker.email = workerDTO.email;
        worker.password = workerDTO.password;
        worker.hourlyRate = workerDTO.hourlyRate;
        worker.availability = workerDTO.availability;



        return await this.workerRepository.save(worker);
      }


    async getAllWorkers(): Promise<WorkersEntity[]> {
        const workers = await this.workerRepository.find();
        return workers;
    }

    async getWorkerById(id: number): Promise<WorkersEntity>
    {
        const worker = await this.workerRepository.findOne({ where: { id } });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        return worker;

    }

    async getWorkerByEmail(email: string): Promise<WorkersEntity> {
        const worker = await this.workerRepository.findOne({ where: { email } });
        if (!worker) {
          throw new NotFoundException(`Worker with email ${email} not found`);
        }
        return worker;
    }

    async getImageById(id: number): Promise<string> {
      const worker = await this.workerRepository.findOne({ where: { id } });
      if (!worker) {
        throw new NotFoundException(`Worker with ID ${id} not found`);
      }
      return worker.profilePicture;
    }


    async updateWorker(id: number, workerDTO: updateWorkerDTO): Promise<WorkersEntity>
    {
        const worker = await this.workerRepository.findOne({ where: { id }});
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        worker.name = workerDTO.name;
        worker.email = workerDTO.email;
        // worker.phone = workerDTO.phone;
        // worker.address = workerDTO.address;
        // worker.bio = workerDTO.bio;
        //worker.skills = workerDTO.skills;
        worker.hourlyRate = workerDTO.hourlyRate;
        worker.availability = workerDTO.availability;
        return await this.workerRepository.save(worker);
    }

    async deleteWorker(id: number): Promise<void> {
        const result = await this.workerRepository.delete({ id });
        if (result.affected === 0) {
          throw new NotFoundException(`Worker with ID ${id} not found`);
        }
      }

    async getWorkerInfo(id: number): Promise<WorkersEntity> {
        const worker = await this.workerRepository.findOne({ where: { id }, relations: ['workerInfo'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        return worker;
      }
          //update the worker and worker-info at the same time
    async updateWorkerInfo(id: number, worker_workerInfDto: worker_workerInfDto): Promise<WorkersEntity> {
        const worker = await this.workerRepository.findOne({ where: { id }, relations: ['workerInfo'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        worker.name = worker_workerInfDto.name;
        worker.email = worker_workerInfDto.email;
        worker.workerInfo.bio = worker_workerInfDto.bio;
        worker.workerInfo.address = worker_workerInfDto.address;
        worker.workerInfo.phone = worker_workerInfDto.phone;
        worker.workerInfo.birthDate = worker_workerInfDto.birthDate;
        return await this.workerRepository.save(worker);
      }


    async getAvailableWorkers(): Promise<WorkersEntity[]> {
        return await this.workerRepository.find({ where: { availability: true } });
    }

    async getAllServices(): Promise<ServiceEntity[]> {
        return await this.serviceRepository.find();
    }

   //see specific service and it's associated workers
   async getServiceById(id: number, serviceId: number): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOne({ where: { serviceId }, relations: ['workers'] });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }
    return service;
  }

    async addServiceToWorker(workerId: number, serviceId: number): Promise<ServiceEntity> {
      const worker = await this.workerRepository.findOne({ where: {id: workerId}, relations: ['services'] });

      const service = await this.serviceRepository.findOne({ where: {serviceId: serviceId}, relations: ['workers'] });


      if (service && worker){
        worker.services.push(service);
        await this.workerRepository.save(worker);
        return service;
      }
      else{
        throw new NotFoundException(`Service with ID ${serviceId} not found`);
        }
      }

      async getServicesOfWorker(workerId: number): Promise<ServiceEntity[]> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['services'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        return worker.services;
      }

      // //remove specific service from worker and it will return the updated worker with the service removed
      // async removeServiceFromWorker(workerId: number, serviceId: number): Promise<WorkersEntity> {
      //   const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['services'] });
      //   const service = await this.serviceRepository.findOne({ where: { serviceId: serviceId } });
      //   if (!worker) {
      //     throw new NotFoundException(`Worker with ID ${workerId} not found`);
      //   }
      //   if (!service) {
      //     throw new NotFoundException(`Service with ID ${serviceId} not found`);
      //   }
      //   worker.services = worker.services.filter(service => service.serviceId !== serviceId);
      //   return await this.workerRepository.save(worker);
      // }
      // const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['services'] });

      // const service = await this.serviceRepository.findOne({ where: { serviceId: serviceId }, relations: ['workers'] });

      async removeServiceFromWorker(workerId: number, serviceId: number): Promise<void> {
        // Find the worker with the specified ID
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['services'] });

        const service = await this.serviceRepository.findOne({ where: { serviceId: serviceId }, relations: ['workers'] });
      
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
      
        // Log the worker's services before attempting to remove the service
        console.log('Worker services before removal:', worker.services);
      
        // Find the index of the service in the worker's services array
        //const index = worker.services.findIndex(service => service.serviceId === serviceId);
        //const index = service.workers.findIndex(worker => worker.id === workerId);
        //delete only the service associatioin with the worker
        const index2 = worker.services.findIndex(service => service.serviceId === serviceId);

        // If the service is not found in the worker's services array, throw an error
        if ( index2 === -1) {

          console.log('Worker services after removal:', worker.services);
          console.log(index2);
        }

      
        // Remove the service from the worker's services array
        worker.services.splice(index2, 1);
      
        // Log the worker's services after removing the service
        console.log('Worker services after removal:', worker.services);
      
        // Save the updated worker
        await this.workerRepository.save(worker);
      }
      
      
      
      


      async getReviewsOfWorker(workerId: number): Promise<ReviewEntity[]> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['reviews'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        return worker.reviews;
      }


      async addReviewToWorker(workerId: number, review: ReviewEntity): Promise<ReviewEntity> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['reviews'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        review.worker = worker;
        return await this.reviewRepository.save(review);
      }

      async updateReviewOfWorker(workerId: number, reviewId: number, review: ReviewEntity): Promise<ReviewEntity> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['reviews'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
    
        const reviewIndex = worker.reviews.findIndex(review => review.id === reviewId);
        if (reviewIndex === -1) {
          throw new NotFoundException(`Review with ID ${reviewId} not found for worker`);
        }
    
        worker.reviews[reviewIndex] = review;
        return await this.reviewRepository.save(review);
      }

      async removeReviewFromWorker (workerId: number, reviewId: number): Promise<void> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['reviews'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
    
        const reviewIndex = worker.reviews.findIndex(review => review.id === reviewId);
        if (reviewIndex === -1) {
          throw new NotFoundException(`Review with ID ${reviewId} not found for worker`);
        }
    
        worker.reviews.splice(reviewIndex, 1);
        await this.workerRepository.save(worker);
      }

      async getOrdersOfWorker(workerId: number): Promise<OrderEntity[]> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        return worker.orders;
      }

      async addOrderToWorker(workerId: number, order: OrderEntity): Promise<OrderEntity> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        order.worker = worker;
        return await this.orderRepository.save(order);
      }


    async updateOrderOfWorker(workerId: number, orderId: number, order: OrderEntity): Promise<OrderEntity> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
    
        const orderIndex = worker.orders.findIndex(order => order.orderId === orderId);
        if (orderIndex === -1) {
          throw new NotFoundException(`Order with ID ${orderId} not found for worker`);
        }
    
        worker.orders[orderIndex] = order;
        return await this.orderRepository.save(order);
      }

      async getPendingOrdersOfWorker(workerId: number): Promise<OrderEntity[]> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        return worker.orders.filter(order => order.status === 'pending');
      }

      async getProcessingOrdersOfWorker(workerId: number): Promise<OrderEntity[]> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        return worker.orders.filter(order => order.status === 'processing');
      }

      //get only completed orders
      async getCompletedOrdersOfWorker(workerId: number): Promise<OrderEntity[]> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        return worker.orders.filter(order => order.status === 'completed');
      }

      //get only cancelled orders

      async getCancelledOrdersOfWorker(workerId: number): Promise<OrderEntity[]> {
        const worker = await this.workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        return worker.orders.filter(order => order.status === 'cancelled');
      }

      //change the status from pending to processing
      async changeOrderStatusToProcessing(workerId: number, orderId: number): Promise<OrderEntity> {
        const worker = await this. workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        console.log(orderId);
        //search order from the orderId
        const order1 = await this.orderRepository.findOne({ where: { orderId: orderId } });
        if(!order1){  
          throw new NotFoundException(`Order with ID ${orderId} not found for worker`);
        }
        //console.log(order1.(order => order.orderId === orderId) );

        //read orders from worker which order id is equal to the order id

        //console.log(order1);
        //assign the status to processing from pending
        order1.status = 'processing';

        //order.status = 'processing';

        return await this.orderRepository.save(order1);
      }

      //change the status from processing to completed
      async changeOrderStatusToCompleted(workerId: number, orderId: number): Promise<OrderEntity> {
        const worker = await this. workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        console.log(orderId);
        //search order from the orderId
        const order1 = await this.orderRepository.findOne({ where: { orderId: orderId } });
        if(!order1){  
          throw new NotFoundException(`Order with ID ${orderId} not found for worker`);
        }
        //console.log(order1.(order => order.orderId === orderId) );

        //read orders from worker which order id is equal to the order id

        //console.log(order1);
        //assign the status to processing from pending
        order1.status = 'completed';

        //order.status = 'processing';
        return await this.orderRepository.save(order1);
      }

      //change the status from processing to cancelled
      async changeOrderStatusToCancelled(workerId: number, orderId: number): Promise<OrderEntity> {
        const worker = await this. workerRepository.findOne({ where: { id: workerId }, relations: ['orders'] });
        if (!worker) {
          throw new NotFoundException(`Worker with ID ${workerId} not found`);
        }
        console.log(orderId);
        //search order from the orderId
        const order1 = await this.orderRepository.findOne({ where: { orderId: orderId } });
        if(!order1){  
          throw new NotFoundException(`Order with ID ${orderId} not found for worker`);
        }
        //console.log(order1.(order => order.orderId === orderId) );

        //read orders from worker which order id is equal to the order id

        //console.log(order1);
        //assign the status to processing from pending
        order1.status = 'cancelled';

        //order.status = 'processing';
        return await this.orderRepository.save(order1);
      }







      async sendMail(): Promise<string> {
        await this.mailerService.sendMail({
          to: 'abdullahashik2001@gmail.com',
          subject: 'Mailer Testing',
          text: 'Hello, This is a test mail from NestJS application',
          });
        return 'Mail sent successfully';
      }




///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


      async findOneBy( loginData:loginDTO): Promise<any> {
        return await this.workerRepository.findOneBy({email:loginData.email});
      }

}