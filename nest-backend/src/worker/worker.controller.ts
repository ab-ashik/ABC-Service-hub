import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkersService } from "./worker.service";
import { WorkersEntity } from "./worker.entity";
import { WorkerDTO, updateWorkerDTO } from "./dto/worker.dto";
import { AuthGuard } from "./auth/auth.guard";
import { ServiceEntity } from "src/service/services.entity";
import { ReviewEntity } from "src/review/review.entity";
import { OrderEntity } from "src/order/order.entity";
import { worker_workerInfDto } from "./dto/worker_workerInf.dto";

@UseGuards(AuthGuard)
@Controller('workers')
export class WorkersController {
    constructor (private workersService: WorkersService) {}

    // @Get()
    // getUsers():object {
    //     return this.workersService.getUsers();
    // }

    // @Post('createWorker')
    // @UsePipes(new ValidationPipe())
    // async createWorker(@Body() workersEntity: WorkerDTO): Promise<WorkersEntity>
    // {
    //     return this.workersService.createWorker(workersEntity);
    // }

    // @Get('findFullName/:substring')
    // async getWorkerBySubstring(@Param('substring') substring: string):Promise<WorkersEntity[]>
    // {
    //     return this.workersService.getWorkerBySubstring(substring);
    // }

    // @Get('findUsername/:username')
    // async findByUsername(@Param('username') username: string):Promise<WorkersEntity>
    // {
    //     return this.workersService.findByUsername(username);
    // }

    // @Delete('delete/:username')
    // async removeByUsername(@Param('username') username:string):Promise<string>
    // {
    //     return this.workersService.removeByUsername(username);
    
    
    // }
    
    

    // @Post('createWorker')
    // @UsePipes(new ValidationPipe())
    // async createWorker(@Body() WorkerDTO: WorkerDTO): Promise<WorkerDTO>
    // {
    //     return this.workersService.createWorker(WorkerDTO);
    // }

    @Get('')
    async getAllWorkers(): Promise<WorkerDTO[]> {
        return await this.workersService.getAllWorkers();
    }

    @Get(':id')
    async getWorkerById(@Param('id') id: number): Promise<WorkersEntity>
    {
        const worker =  await this.workersService.getWorkerById(id);

        if(!worker)
        {
            throw new NotFoundException('Worker with ID ${id} not found!!!!!!!');
        }
        return worker;
    }
    @Delete(':id')
    async deleteWorker(@Param('id') id: number): Promise<void> {
        return await this.workersService.deleteWorker(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateWorker(@Param('id') id: number, @Body() workerDTO: updateWorkerDTO): Promise<WorkersEntity>
    {
        return this.workersService.updateWorker(id, workerDTO);
    }

    @Get('available')
    async getAvailableWorkers(): Promise<WorkerDTO[]>
    {
        return this.workersService.getAvailableWorkers();
    }

    //get worker by email
    @Get('get/:email')
    async getWorkerByEmail(@Param('email') email: string): Promise<WorkersEntity>
    {
        return this.workersService.getWorkerByEmail(email);
    }
    // //get image file of worker
    // @Get('image/:id')
    // async getImageById(@Param('id', ParseIntPipe) id: number, @Res() res) {
    //   try {
    //     const filename = await this.workersService.getImageById(id);
    //     if (!filename) {
    //       throw new Error('Image not found');
    //     }
    //     res.sendFile(filename, { root: './upload' }); // Adjust the root path as needed
    //   } catch (error) {
    //     console.error('Error sending file:', error);
    //     res.status(404).send('File not found');
    //   }
    // }

    @Get('images/:filename')
    async getImageByName(@Param('filename') filename: string, @Res() res) {
      try {
        if (!filename) {
          throw new Error('Image not found');
        }
        res.sendFile (filename, { root: 'uploads/' }); // Adjust the root path as needed
        } catch (error) {
        console.error('Error sending file:', error);
        res.status(404).send('File not found');
        }
    }
    //get image file of a worker with worker id
    @Get('image/:id')
    async getImageById(@Param('id', ParseIntPipe) id: number, @Res() res) {
      try {
        const filename = await this.workersService.getImageById(id);
        if (!filename) {
          throw new Error('Image not found');
        }
        res.sendFile(filename, { root: 'uploads/' }); // Adjust the root path as needed
      } catch (error) {
        console.error('Error sending file:', error);
        res.status(404).send('File not found');
      }
    }



    @Get(':id/info')
    async getWorkerInfo(@Param('id') id: number): Promise<WorkersEntity>
    {
        return this.workersService.getWorkerInfo(id);
    }

    //update the worker and worker-info at the same time
    @Put(':id/info')
    @UsePipes(new ValidationPipe())
    async updateWorkerInfo(@Param('id') id: number, @Body() worker_workerInfDto: worker_workerInfDto): Promise<WorkersEntity>
    {
        return this.workersService.updateWorkerInfo(id, worker_workerInfDto);
    }

    @Get(':id/allServices')
    async getAllServices(): Promise<ServiceEntity[]> {
        return await this.workersService.getAllServices();
    }



     @Get(':id/allServices/:serviceId')
    async getServiceById(@Param('id') id: number, @Param('serviceId') serviceId: number): Promise<ServiceEntity>
    {
        return this.workersService.getServiceById(id,serviceId);
    }
 
    // @Get('/:id/allServices/:serviceId')
    // async getServiceById(@Param('id') id: number, @Param('serviceId') serviceId: number): Promise<ServiceEntity>
    // {
    //     return this.workersService.getServiceById(id,serviceId);
    // }


    @Post(':id/allServices/:serviceId')
    async addServiceToWorker(@Param('id') id: number, @Param('serviceId') serviceId: number): Promise<ServiceEntity>
    {
        return this.workersService.addServiceToWorker(id, serviceId);
    }



    @Get(':id/services')
    async getServicesOfWorker(@Param('id') id: number): Promise<ServiceEntity[]>
    {
       return this.workersService.getServicesOfWorker(id);
    }

    @Delete(':id/services/:serviceId')
    async removeServiceFromWorker(@Param('id') id: number, @Param('serviceId') serviceId: number): Promise<void>
    {
        return this.workersService.removeServiceFromWorker(id, serviceId);
    }   


    @Get(':id/reviews')
    async getReviewsOfWorker(@Param('id') id: number): Promise<ReviewEntity[]>
    {
        return this.workersService.getReviewsOfWorker(id);
    }

 
    @Post(':id/reviews')
    async addReviewToWorker(@Param('id') id: number, @Body() review: ReviewEntity): Promise<ReviewEntity>
    {
        return this.workersService.addReviewToWorker(id, review);
    }

    //update reviews of worker
    @Put(':id/reviews/:reviewId')
    async updateReviewOfWorker(@Param('id') id: number, @Param('reviewId') reviewId: number, @Body() review: ReviewEntity): Promise<ReviewEntity>
    {
        return this.workersService.updateReviewOfWorker(id, reviewId, review);
    }

    @Delete(':id/reviews/:reviewId')
    async removeReviewFromWorker(@Param('id') id: number, @Param('reviewId') reviewId: number): Promise<void>
    {
        return this.workersService.removeReviewFromWorker(id, reviewId);
    }


    @Get(':id/orders')
    async getOrdersOfWorker(@Param('id') id: number): Promise<OrderEntity[]>
    {
        return this.workersService.getOrdersOfWorker(id);
    }


    @Post(':id/orders')
    async addOrderToWorker(@Param('id') id: number, @Body() order: OrderEntity): Promise<OrderEntity>
    {
        return this.workersService.addOrderToWorker(id, order);
    }


    @Put(':id/orders/:orderId')
    async updateOrderOfWorker(@Param('id') id: number, @Param('orderId') orderId: number, @Body() order: OrderEntity): Promise<OrderEntity>
    {
        return this.workersService.updateOrderOfWorker(id, orderId, order);
    }

    //get only pending orders
    @Get(':id/orders/pending')
    async getPendingOrdersOfWorker(@Param('id') id: number): Promise<OrderEntity[]>
    {
        return this.workersService.getPendingOrdersOfWorker(id);
    }

    //get only processing orders
    @Get(':id/orders/processing')
    async getProcessingOrdersOfWorker(@Param('id') id: number): Promise<OrderEntity[]>
    {
        return this.workersService.getProcessingOrdersOfWorker(id);
    }

    //get only completed orders
    @Get(':id/orders/completed')
    async getCompletedOrdersOfWorker(@Param('id') id: number): Promise<OrderEntity[]>
    {
        return this.workersService.getCompletedOrdersOfWorker(id);
    }

    //get only cancelled orders
    @Get(':id/orders/cancelled')
    async getCancelledOrdersOfWorker(@Param('id') id: number): Promise<OrderEntity[]>
    {
        return this.workersService.getCancelledOrdersOfWorker(id);
    }

    //change the status from pending to processing
    @Put(':id/orders/:orderId/processing')
    async changeOrderStatusToProcessing(@Param('id') id: number, @Param('orderId') orderId: number): Promise<OrderEntity>
    {
        return this.workersService.changeOrderStatusToProcessing(id, orderId);
    }

    //change the status from processing to completed
    @Put(':id/orders/:orderId/completed')
    async changeOrderStatusToCompleted(@Param('id') id: number, @Param('orderId') orderId: number): Promise<OrderEntity>
    {
        return this.workersService.changeOrderStatusToCompleted(id, orderId);
    }

    //make pending to cancelled
    @Put(':id/orders/:orderId/cancelled')
    async changeOrderStatusToCancelled(@Param('id') id: number, @Param('orderId') orderId: number): Promise<OrderEntity>
    {
        return this.workersService.changeOrderStatusToCancelled(id, orderId);
    }







    @Post('sendMail')

    async sendMail(): Promise<string> {
        return this.workersService.sendMail();
    }





    
    

} 